import { app } from "./app";
import config from "./config";
import { connectDB } from "./database/mongo.database";

connectDB().then(() => {
	app.listen(config.port, () => {
		console.log("Server listening on port: ", config.port);
	});
});
