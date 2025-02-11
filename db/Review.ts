import mongoose, { Schema, Document } from "mongoose";
import { nanoid } from "nanoid";
import Product from "./Product";

interface ReviewEntry {
	id: string;
	userId: string;
	rating: number;
	comment: string;
	createdAt: Date;
}

interface Review extends Document {
	id: string;
	productId: string;
	reviews: ReviewEntry[];
	createdAt: Date;
	updatedAt: Date;
}

const ReviewSchema = new Schema<Review>(
	{
		id: {
			type: String,
			default: () => nanoid(),
		},
		productId: { type: String, ref: "Product", required: true },
		reviews: [
			{
				id: { type: String, default: () => nanoid() },
				userId: { type: String, ref: "User", required: true },
				rating: { type: Number, required: true, min: 1, max: 5 },
				comment: { type: String, required: true },
				createdAt: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true }
);

ReviewSchema.pre("save", async function (next) {
	const productExists = await Product.findById(this.productId);
	if (!productExists) {
		throw new Error("Invalid productId: Product does not exist");
	}
	for (const review of this.reviews) {
		const userExists = await mongoose.model("User").findById(review.userId);
		if (!userExists) {
			throw new Error("Invalid userId: User does not exist");
		}
	}

	next();
});

export default mongoose.models.Review || mongoose.model<Review>("Review", ReviewSchema);
