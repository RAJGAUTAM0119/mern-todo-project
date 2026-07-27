import mongoose from "mongoose";
import { env } from "./env.config.ts";

const { MONGODB_URI } = env;
export const connectDB = async ():Promise<void> => {
	try {
		await mongoose.connect(MONGODB_URI, { dbName: "ToDo-Application" });
		console.log("MongoDB connected successfully");
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error("Unknown database error", error);
		}
		throw error;
	}
};
