import mongoose, { Schema, Document, Types } from "mongoose";

interface Review extends Document {
	productId: Types.ObjectId;
	reviews: {
		userId: Types.ObjectId;
		rating: number;
		comment: string;
		createdAt: Date;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const ReviewSchema = new Schema<Review>(
	{
		productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
		reviews: [
			{
				userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
				rating: { type: Number, required: true, min: 1, max: 5 },
				comment: { type: String, required: true },
				createdAt: { type: Date, default: Date.now },
			}
		],
	},
	{ timestamps: true }
);

export default mongoose.models.Review || mongoose.model<Review>("Review", ReviewSchema);
