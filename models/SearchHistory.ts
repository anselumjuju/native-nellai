import mongoose, { Schema, Document, Types } from "mongoose";

interface SearchHistory extends Document {
	userId: Types.ObjectId;
	searchParams: {
		param: string;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const SearchHistorySchema = new Schema<SearchHistory>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		searchParams: [
			{
				param: { type: String, required: true },
			}
		],
	},
	{ timestamps: true }
);

export default mongoose.models.SearchHistory || mongoose.model<SearchHistory>("SearchHistory", SearchHistorySchema);
