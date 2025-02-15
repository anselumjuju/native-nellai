import mongoose, { Schema, Document, Model, UpdateQuery } from "mongoose";
import slugify from "slugify";

export interface ICategory extends Document {
	name: string;
	description: string;
	slug: string;
	createdAt: Date;
	updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, required: true },
		slug: { type: String, unique: true },
	},
	{ timestamps: true }
);

CategorySchema.pre<ICategory>("save", function (next) {
	if (!this.slug || this.isModified("name")) {
		this.slug = slugify(this.name, { lower: true, strict: true });
	}
	next();
});

CategorySchema.pre("findOneAndUpdate", function (next) {
	const update: UpdateQuery<ICategory> | null = this.getUpdate();
	if (!update) return next();
	if (update.name) update.slug = slugify(update.name, { lower: true, strict: true });
	next();
});

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
