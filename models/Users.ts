import mongoose, { Schema, Document, Types } from "mongoose";

interface User extends Document {
	email: string;
	password?: string;
	name: string;
	profilePic?: string;
	phoneNumber?: string;
	role: "user" | "admin";
	authProvider: "email" | "google";
	address?: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
	};
	wishlist: Types.ObjectId[];
	cart: Types.ObjectId;
	orders: Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<User>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: false },
		name: { type: String, required: true },
		profilePic: { type: String, required: false },
		phoneNumber: { type: String, required: false },
		role: { type: String, enum: ["user", "admin"], default: "user" },
		authProvider: { type: String, enum: ["email", "google"], required: true },
		address: {
			street: { type: String, required: false },
			city: { type: String, required: false },
			state: { type: String, required: false },
			zipCode: { type: String, required: false },
			country: { type: String, required: false },
		},
		wishlist: [{ type: Schema.Types.ObjectId, ref: "Wishlist" }],
		cart: { type: Schema.Types.ObjectId, ref: "Cart", required: false },
		orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
	},
	{ timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
