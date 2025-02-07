import mongoose, { Schema, Document, Types } from "mongoose";

interface Category extends Document {
	name: string;
	description: string;
	image?: string;
	createdAt: Date;
}

const CategorySchema = new Schema<Category>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Category || mongoose.model<Category>("Category", CategorySchema);
