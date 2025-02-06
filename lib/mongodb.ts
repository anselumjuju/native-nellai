import mongoose from "mongoose";

declare global {
	var mongoose: { conn: any, promise: any };
}

const MONGODB_URI = process.env.MONGODB_URI;


let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}


async function connectToDatabase() {
	if (cached.conn) return cached.conn;

	if (!MONGODB_URI) {
		throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

export default connectToDatabase;