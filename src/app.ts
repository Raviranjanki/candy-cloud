import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import config from "./config";
import { userRoutes } from "./routes/user.routes";
import { errorController } from "./controllers/error.controller";
import { ApiError } from "./utils/ApiError";
import { productRoutes } from "./routes/product.routes";
import { categoryRoutes } from "./routes/category.routes";

const app = express();

// middlewares
app.use(
	cors({
		origin: config.corsOrigin,
		credentials: true,
	})
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.all("*", (req, _, next) => {
	next(new ApiError(404, `Can't find ${req.originalUrl} on the server!`));
});

app.use(errorController);

export { app };
