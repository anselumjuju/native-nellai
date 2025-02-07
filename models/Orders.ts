import mongoose, { Schema, Document, Types } from "mongoose";

interface Order extends Document {
	userId: Types.ObjectId;
	items: {
		productId: Types.ObjectId;
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

const OrderSchema = new Schema<Order>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		items: [
			{
				productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
				quantity: { type: Number, required: true },
			}
		],
		totalPrice: { type: Number, required: true },
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

export default mongoose.models.Order || mongoose.model<Order>("Order", OrderSchema);
