import mongoose from "mongoose";

export function connectMongoose() {
  if (mongoose.connection.readyState === 1)
    return mongoose.connection.asPromise();

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined");
  return mongoose.connect(uri);
}
