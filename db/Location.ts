import mongoose, { Schema, Document, UpdateQuery } from "mongoose";
import slugify from "slugify";

export interface ILocation extends Document {
	name: string;
	image: string;
	slug: string;
	createdAt: Date;
	updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>(
	{
		name: { type: String, required: true },
		image: { type: String, required: true },
		slug: { type: String, unique: true },
	},
	{ timestamps: true }
);

LocationSchema.pre("save", async function (this: ILocation) {
	if (!this.slug) {
		this.slug = slugify(this.name, { lower: true, strict: true });
	}
});

LocationSchema.pre("findOneAndUpdate", async function (this: any) {
	const update: UpdateQuery<ILocation> | null = this.getUpdate();
	if (!update) return;
	if (update.name) update.slug = slugify(update.name, { lower: true, strict: true });
});

export default mongoose.models.Location || mongoose.model<ILocation>("Location", LocationSchema);
