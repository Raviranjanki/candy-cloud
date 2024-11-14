import dotenv from "dotenv";
dotenv.config();

export default {
	port: process.env.PORT,
	dbName: process.env.DB_NAME,
	dbURL: process.env.DB_URL,
	corsOrigin: process.env.CORS_ORIGIN
};
