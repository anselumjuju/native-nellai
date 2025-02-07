import mongoose, { Schema, Document, Types } from "mongoose";

interface Banner extends Document {
	productId: Types.ObjectId;
	priority: number;
	image?: string;
	createdAt: Date;
}

const BannerSchema = new Schema<Banner>({
	productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	priority: { type: Number, required: true },
	image: { type: String },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Banner || mongoose.model<Banner>("Banner", BannerSchema);
