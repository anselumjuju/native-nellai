import mongoose from "mongoose";

interface MongooseGlobal {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mongooseGlobal: MongooseGlobal = (globalThis as any).mongooseGlobal || { conn: null, promise: null };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).mongooseGlobal = mongooseGlobal;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function connectToDatabase() {
	if (mongooseGlobal.conn) return mongooseGlobal.conn;

	if (!MONGODB_URI) {
		throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
	}

	if (!mongooseGlobal.promise) {
		mongooseGlobal.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
	}

	mongooseGlobal.conn = await mongooseGlobal.promise;
	return mongooseGlobal.conn;
}

export default connectToDatabase;
