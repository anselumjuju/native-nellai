import mongoose from "mongoose";
import dns from "node:dns";

interface MongooseGlobal {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}
const mongooseGlobal: MongooseGlobal = (globalThis as any).mongooseGlobal || { conn: null, promise: null };

(globalThis as any).mongooseGlobal = mongooseGlobal;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function connectToDatabase() {
	dns.setServers(["8.8.8.8", "8.8.4.4"]);
	if (mongooseGlobal.conn) return mongooseGlobal.conn;

	if (!MONGODB_URI) {
		console.error("MONGODB_URI is not defined!");
		throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
	}

	try {
		if (!mongooseGlobal.promise) {
			// To avoid logging sensitive info, we only log the start and end of the URI or length
			const maskedUri = MONGODB_URI.replace(/:([^@]+)@/, ":****@");

			mongooseGlobal.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
				return mongoose;
			});
		}

		mongooseGlobal.conn = await mongooseGlobal.promise;
		return mongooseGlobal.conn;
	} catch (error) {
		console.error("MongoDB connection error:", error);
		mongooseGlobal.promise = null; // Reset promise on error so we can retry
		throw error;
	}
}

export default connectToDatabase;
