import mongoose, { Schema, Document } from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";

interface Category extends Document {
	id: string;
	name: string;
	description: string;
	image?: string;
	slug: string;
	createdAt: Date;
	updatedAt: Date;
}

const CategorySchema = new Schema<Category>(
	{
		id: {
			type: String,
			default: () => nanoid(),
		},
		name: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String },
		slug: { type: String, unique: true },
	},
	{ timestamps: true }
);

CategorySchema.pre("save", function (next) {
	if (!this.slug) {
		this.slug = slugify(this.name, { lower: true, strict: true });
	}
	next();
});

export default mongoose.models.Category || mongoose.model<Category>("Category", CategorySchema);
