import mongoose, { Schema, Document, Types } from "mongoose";

interface Product extends Document {
	name: string;
	images: {
		main: string;
		banner: string;
		others: string[];
	};
	caption: string;
	description: string;
	about: string;
	quantity: number;
	originalPrice: number;
	discountPrice: number;
	categoryId: Types.ObjectId;
	locationId: Types.ObjectId;
	isBanner: boolean;
	createdAt: Date;
}

const ProductSchema = new Schema<Product>({
	name: { type: String, required: true },
	images: {
		main: { type: String, required: true },
		banner: { type: String, required: true },
		others: { type: [String], required: true },
	},
	caption: { type: String, required: true },
	description: { type: String, required: true },
	about: { type: String, required: true },
	quantity: { type: Number, required: true },
	originalPrice: { type: Number, required: true },
	discountPrice: { type: Number, required: true },
	categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
	locationId: { type: Schema.Types.ObjectId, ref: "Location", required: true },
	isBanner: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model<Product>("Product", ProductSchema);
