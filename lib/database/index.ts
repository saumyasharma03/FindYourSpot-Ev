import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConn{
    conn: Mongoose|null;
    promise: Promise<Mongoose>|null;
}

let cached: MongooseConn = (global as any).mognoose || { conn: null, promise: null };
if(!cached){
    cached= (global as any).mongoose={
        conn:null,
        promise:null,
    };
}
export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;
    if (!MONGODB_URL) throw new Error("MONGODB_URI IS MISSING");
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'evently',
        bufferCommands: false,
        connectTimeoutMS:30000,
    });
    //console.log(cached.promise);
    cached.conn = await cached.promise;
    return cached.conn;
}