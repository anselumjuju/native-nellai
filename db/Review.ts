import mongoose, { Schema, Document } from "mongoose";
import Product from "./Product";
import User from "./User";

export interface IReview extends Document {
	productId: string;
	rating: number;
	comment: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
	{
		productId: { type: Schema.Types.String, ref: "Product", required: true },
		rating: { type: Number, required: true, min: 1, max: 5 },
		comment: { type: String, required: true },
		userId: { type: Schema.Types.String, ref: "User", required: true },
	},
	{ timestamps: true }
);

ReviewSchema.pre("save", async function (next) {
	const product = await Product.findById(this.productId);
	if (!product) throw new Error("Invalid productId: Product does not exist");

	const user = await User.findById(this.userId);
	if (!user) throw new Error("Invalid userId: User does not exist");

	next();
});

ReviewSchema.post("save", async function (doc, next) {
	try {
		await Product.findByIdAndUpdate(doc.productId, {
			$push: { reviews: doc._id }
		});
		next();
	} catch (error) {
		throw new Error("Invalid productId: Product does not exist");
	}
});

ReviewSchema.post("findOneAndDelete", async function (doc, next) {
	try {
		if (doc) {
			await Product.findByIdAndUpdate(doc.productId, {
				$pull: { reviews: doc._id }
			});
		}
		next();
	} catch (error) {
		throw new Error("Invalid productId: Product does not exist");
	}
});

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
