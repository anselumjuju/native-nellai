import mongoose, { Schema, Document, Types } from "mongoose";

interface Cart extends Document {
	userId: Types.ObjectId;
	items: {
		productId: Types.ObjectId;
		quantity: number;
		price: number;
	}[];
	totalPrice: number;
	createdAt: Date;
	updatedAt: Date;
}

const CartSchema = new Schema<Cart>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		items: [
			{
				productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
				quantity: { type: Number, required: true },
				price: { type: Number, required: true },
			}
		],
		totalPrice: { type: Number, required: true },
	},
	{ timestamps: true }
);

export default mongoose.models.Cart || mongoose.model<Cart>("Cart", CartSchema);
