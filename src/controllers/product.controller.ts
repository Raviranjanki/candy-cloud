import { Request, Response } from "express";
import mongoose from "mongoose";
import { Product } from "../models/product.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { CreateProductBodyType, UpdateProductBodyType, UpdateProductParamsType } from "../validation/product.schema";

export const getProductsHandler = asyncHandler(async (_: Request, res: Response) => {
	const products = await Product.find({ is_deleted: false }).select("-is_deleted");
	res.json(new ApiResponse(200, products));
});

export const storeProductHandler = asyncHandler(async (req: Request<{}, {}, CreateProductBodyType>, res: Response) => {
	const body = req.body;

	const existingProduct = await Product.findOne({ slug: body.slug });

	if (existingProduct) {
		throw new ApiError(409, "A product with this slug already exists.");
	}

	const newProduct = await Product.create(body);
	res.json(new ApiResponse(201, newProduct));
});

export const updateProductHandler = asyncHandler(
	async (req: Request<Partial<UpdateProductParamsType>, {}, Partial<UpdateProductBodyType>>, res: Response) => {
		const { id: productId } = req.params;
		const updateData = req.body;

		if (!mongoose.Types.ObjectId.isValid(productId as string)) {
			throw new ApiError(400, "Invalid product ID.");
		}

		const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, updateData, {
			new: true,
			runValidators: true,
		});

		if (!updatedProduct) {
			throw new ApiError(404, "Product not found.");
		}

		res.json(new ApiResponse(200, updatedProduct));
	}
);

export const deleteProductHandler = asyncHandler(
	async (req: Request<Partial<UpdateProductParamsType>, {}, {}>, res: Response) => {
		const { id: productId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(productId as string)) {
			throw new ApiError(400, "Invalid product ID.");
		}

		const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, { is_deleted: true });

		if (!updatedProduct) {
			throw new ApiError(404, "Product not found.");
		}

		res.json(new ApiResponse(200, { id: productId }, "Product deleted successfully."));
	}
);
