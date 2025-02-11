import mongoose, { Schema, Document } from "mongoose";
import { nanoid } from "nanoid";
import Product from "./Product";
import User from "./User";

interface OrderItem {
	id: string;
	productId: string;
	quantity: number;
}

interface Order extends Document {
	id: string;
	userId: string;
	items: OrderItem[];
	totalPrice: number;
	status: "pending" | "shipped" | "delivered" | "cancelled";
	paymentStatus: "paid" | "pending" | "failed";
	transactionId?: string;
	upiId?: string;
	createdAt: Date;
	updatedAt: Date;
}

const OrderSchema = new Schema<Order>(
	{
		id: {
			type: String,
			default: () => nanoid(),
		},
		userId: { type: String, ref: "User", required: true },
		items: [
			{
				id: { type: String, default: () => nanoid() },
				productId: { type: String, ref: "Product", required: true },
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
	if (!userExists) {
		throw new Error("Invalid userId: User does not exist");
	}

	for (const item of this.items) {
		const productExists = await Product.findById(item.productId);
		if (!productExists) {
			throw new Error(`Invalid productId: Product with ID ${item.productId} does not exist`);
		}
	}

	next();
});

export default mongoose.models.Order || mongoose.model<Order>("Order", OrderSchema);
