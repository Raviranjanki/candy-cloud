import mongoose from "mongoose";
import config from "../config";

export const connectDB = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			`${config.dbURL}/${config.dbName}`
		);
		console.log(
			`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
		);
	} catch (error) {
		console.log("MONGODB connection FAILED ", error);
		process.exit(1);
	}
};
