import mongoose, { Schema, Document, Types } from "mongoose";

interface Wishlist extends Document {
	userId: Types.ObjectId;
	items: {
		productId: Types.ObjectId;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const WishlistSchema = new Schema<Wishlist>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		items: [
			{
				productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
			}
		],
	},
	{ timestamps: true }
);

export default mongoose.models.Wishlist || mongoose.model<Wishlist>("Wishlist", WishlistSchema);
