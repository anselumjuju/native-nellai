import mongoose, { Schema, Document } from "mongoose";

interface Location extends Document {
	name: string;
	image?: string;
	createdAt: Date;
}

const LocationSchema = new Schema<Location>({
	name: { type: String, required: true },
	image: { type: String },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Location || mongoose.model<Location>("Location", LocationSchema);
