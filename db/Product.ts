import mongoose, { Schema, Document, UpdateQuery } from "mongoose";
import slugify from "slugify";
import Category from "./Category";
import Location from "./Location";

export interface IProduct extends Document {
	name: string;
	slug: string;
	images: {
		main: string;
		banner?: string;
	};
	caption: string;
	description: string;
	about: string;
	quantity: number;
	stock: 'available' | 'unavailable';
	categoryId: string;
	locationId: string;
	originalPrice: number;
	discountPrice: number;
	isBanner: boolean;
	reviews?: string[];
	createdAt: Date;
	updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
	{
		name: { type: String, required: true },
		slug: { type: String, unique: true },
		images: {
			main: { type: String, required: true },
			banner: { type: String },
		},
		caption: { type: String, required: true },
		description: { type: String, required: true },
		about: { type: String, required: true },
		quantity: { type: Number, required: true, min: 0 },
		stock: { type: String, enum: ['available', 'unavailable'], required: true, min: 0 },
		categoryId: { type: String, ref: "Category", required: true },
		locationId: { type: String, ref: "Location", required: true },
		originalPrice: { type: Number, required: true, min: 0 },
		discountPrice: { type: Number, required: true, min: 0 },
		isBanner: { type: Boolean, default: false },
		reviews: [{ type: [String], ref: "Review" }],
	},
	{ timestamps: true }
);

ProductSchema.pre("save", async function (next) {
	if (!this.slug || this.isModified("name")) {
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

ProductSchema.pre("findOneAndUpdate", async function (next) {
	const update: UpdateQuery<IProduct> | null = this.getUpdate();

	if (!update) return next();

	if (update.name) update.slug = slugify(update.name, { lower: true, strict: true });

	if (update.categoryId) {
		const categoryExists = await Category.findById(update.categoryId);
		if (!categoryExists) {
			throw new Error("Invalid categoryId: Category does not exist");
		}
	}

	if (update.locationId) {
		const locationExists = await Location.findById(update.locationId);
		if (!locationExists) {
			throw new Error("Invalid locationId: Location does not exist");
		}
	}

	next();
});

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
