import mongoose, { Schema, Document } from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";

interface Location extends Document {
	id: string;
	name: string;
	image?: string;
	slug: string;
	createdAt: Date;
	updatedAt: Date;
}

const LocationSchema = new Schema<Location>(
	{
		id: {
			type: String,
			default: () => nanoid(),
		},
		name: { type: String, required: true },
		image: { type: String },
		slug: { type: String, unique: true },
	},
	{ timestamps: true }
);

LocationSchema.pre("save", function (next) {
	if (!this.slug) {
		this.slug = slugify(this.name, { lower: true, strict: true });
	}
	next();
});

export default mongoose.models.Location || mongoose.model<Location>("Location", LocationSchema);
