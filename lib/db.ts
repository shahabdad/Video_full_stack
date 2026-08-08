import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

declare global {

    var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongooseCache || { conn: null, promise: null };
if (!global._mongooseCache) global._mongooseCache = cached;

export async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        } as mongoose.ConnectOptions;

        // MONGODB_URI is checked above, use non-null assertion
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((m) => m);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export default mongoose;

