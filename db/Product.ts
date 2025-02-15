import mongoose, { Schema, Document } from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";
import Category from "./Category";
import Location from "./Location";

interface Product extends Document {
	id: string;
	name: string;
	slug: string;
	images: {
		main: string;
		banner?: string;
		others?: string[];
	};
	caption: string;
	description: string;
	about: string;
	quantity: string;
	originalPrice: number;
	discountPrice: number;
	categoryId?: string[];
	locationId: string;
	isBanner: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const ProductSchema = new Schema<Product>(
	{
		id: {
			type: String,
			default: () => nanoid(),
		},
		name: { type: String, required: true },
		slug: { type: String, unique: true },
		images: {
			main: { type: String, required: true },
			banner: { type: String },
			others: { type: [String] },
		},
		caption: { type: String, required: true },
		description: { type: String, required: true },
		about: { type: String, required: true },
		quantity: { type: String, required: true, min: 0 },
		originalPrice: { type: Number, required: true, min: 0 },
		discountPrice: { type: Number, required: true, min: 0 },
		categoryId: { type: [String], ref: "Category", },
		locationId: { type: String, ref: "Location", required: true },
		isBanner: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

ProductSchema.pre("save", async function (next) {
	if (!this.slug) {
		this.slug = slugify(this.name, { lower: true, strict: true });
	}
	const categoryExists = await Category.findById(this.categoryId);
	if (!categoryExists) {
		throw new Error("Invalid categoryId: Category does not exist");
	}
	const locationExists = await Location.findById(this.locationId);
	if (!locationExists) {
		throw new Error("Invalid locationId: Location does not exist");
	}
	next();
});

export default mongoose.models.Product || mongoose.model<Product>("Product", ProductSchema);
