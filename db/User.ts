import mongoose, { Schema, Document } from "mongoose";
import Product from "./Product";
import Order from "./Order";

export interface IUser extends Document {
	uid: string;
	name: string;
	email: string;
	phone: string;
	profilePic: string;
	role: "user" | "admin";
	address?: {
		street?: string;
		city?: string;
		state?: string;
		zipCode: string;
		country: string;
	};
	wishlist: string[];
	cart: {
		productId: string;
		quantity: number;
	}[];
	searchHistory: string[];
	orders: string[];
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
	{
		uid: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String },
		profilePic: { type: String },
		role: { type: String, enum: ["user", "admin"], default: "user" },
		address: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			zipCode: { type: String },
			country: { type: String },
		},
		wishlist: [{ type: String, ref: "Product" }],
		cart: [
			{
				productId: { type: String, ref: "Product", required: true },
				quantity: { type: Number, required: true, min: 1 },
			},
		],
		searchHistory: [{ type: String }],
		orders: [{ type: String, ref: "Order" }],
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	if (!this.isModified("wishlist") && !this.isModified("cart") && !this.isModified("orders")) {
		return next();
	}

	if (this.wishlist.length > 0) {
		const validProducts = await Product.find({ _id: { $in: this.wishlist } }).select("_id");
		const validProductIds = validProducts.map((product) => product._id.toString());

		this.wishlist = this.wishlist.filter((id) => validProductIds.includes(id));
	}

	if (this.cart.length > 0) {
		const validProducts = await Product.find({ _id: { $in: this.cart.map((item) => item.productId) } }).select("_id");
		const validProductIds = validProducts.map((product) => product._id.toString());

		this.cart = this.cart.filter((item) => validProductIds.includes(item.productId));
	}

	if (this.orders.length > 0) {
		const validOrders = await Order.find({ _id: { $in: this.orders } }).select("_id");
		const validOrderIds = validOrders.map((order) => order._id.toString());

		this.orders = this.orders.filter((id) => validOrderIds.includes(id));
	}

	next();
});


export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
