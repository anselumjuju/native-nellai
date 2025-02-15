import mongoose, { Schema, Document } from "mongoose";
import Product from "./Product";
import User from "./User";

export interface IOrder extends Document {
	userId: string;
	items: {
		productId: string;
		quantity: number;
	}[];
	totalPrice: number;
	status: "pending" | "shipped" | "delivered" | "cancelled";
	paymentStatus: "paid" | "pending" | "failed";
	transactionId?: string;
	upiId?: string;
	createdAt: Date;
	updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
	{
		userId: { type: String, ref: "User", required: true },
		items: [
			{
				productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
				quantity: { type: Number, required: true, min: 1 },
			},
		],
		totalPrice: { type: Number, required: true, min: 0 },
		status: {
			type: String,
			enum: ["pending", "shipped", "delivered", "cancelled"],
			default: "pending",
		},
		paymentStatus: {
			type: String,
			enum: ["paid", "pending", "failed"],
			default: "pending",
		},
		transactionId: { type: String },
		upiId: { type: String },
	},
	{ timestamps: true }
);

OrderSchema.pre("save", async function (next) {
	const userExists = await User.findById(this.userId);
	if (!userExists) throw new Error("Invalid userId: User does not exist");
	let total = 0;
	for (const item of this.items) {
		const product = await Product.findById(item.productId);
		if (!product) {
			throw new Error(`Invalid productId: Product with ID ${item.productId} does not exist`);
		}
		if (product.stock === 'unavailable') throw new Error(`Product with ID ${item.productId} is unavailable`);
		const price = product.discountPrice > 0 ? product.discountPrice : product.originalPrice;
		total += price * item.quantity;
	}
	this.totalPrice = total;
	if (this.transactionId && this.paymentStatus !== "paid") {
		throw new Error("Transaction ID should only be set if payment is marked as 'paid'.");
	}
	next();
});

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
