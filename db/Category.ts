import mongoose, { Schema, Document, Model, UpdateQuery, CallbackError } from "mongoose";
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

CategorySchema.pre("save", async function (this: ICategory) {
	if (!this.slug || this.isModified("name")) {
		this.slug = slugify(this.name, { lower: true, strict: true });
	}
});

CategorySchema.pre("findOneAndUpdate", async function (this: any) {
	const update: UpdateQuery<ICategory> | null = this.getUpdate();
	if (!update) return;
	if (update.name) update.slug = slugify(update.name, { lower: true, strict: true });
});

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
