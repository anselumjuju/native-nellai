import mongoose, { Schema, Document } from "mongoose";
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
	orderId?: string;
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
		orderId: { type: String },
	},
	{ timestamps: true }
);

OrderSchema.pre("save", async function (next) {
	const userExists = await User.findById(this.userId);
	if (!userExists) throw new Error("Invalid userId: User does not exist");
	next();
});

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
