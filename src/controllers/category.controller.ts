import { Request, Response } from "express";
import mongoose from "mongoose";
import { Category } from "../models/category.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {
	CreateCategoryBodyType,
	UpdateCategoryBodyType,
	UpdateCategoryParamsType,
} from "../validation/category.schema";

export const getCategoryHandler = asyncHandler(async (_: Request, res: Response) => {
	const categories = await Category.find({ is_deleted: false }).select("-is_deleted");
	res.json(new ApiResponse(200, categories));
});

export const storeCategoryHandler = asyncHandler(
	async (req: Request<{}, {}, CreateCategoryBodyType>, res: Response) => {
		const body = req.body;

		const existingProduct = await Category.findOne({ slug: body.slug });

		if (existingProduct) {
			throw new ApiError(409, "A category with this slug already exists.");
		}

		const newProduct = await Category.create(body);
		res.json(new ApiResponse(201, newProduct));
	}
);

export const updateCategoryHandler = asyncHandler(
	async (req: Request<Partial<UpdateCategoryParamsType>, {}, Partial<UpdateCategoryBodyType>>, res: Response) => {
		const { id: categoryId } = req.params;
		const updateData = req.body;

		if (!mongoose.Types.ObjectId.isValid(categoryId as string)) {
			throw new ApiError(400, "Invalid category ID.");
		}

		const updatedProduct = await Category.findOneAndUpdate({ _id: categoryId }, updateData, {
			new: true,
			runValidators: true,
		});

		if (!updatedProduct) {
			throw new ApiError(404, "Category not found.");
		}

		res.json(new ApiResponse(200, updatedProduct));
	}
);

export const deleteCategoryHandler = asyncHandler(
	async (req: Request<Partial<UpdateCategoryParamsType>, {}, {}>, res: Response) => {
		const { id: categoryId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(categoryId as string)) {
			throw new ApiError(400, "Invalid category ID.");
		}

		const updatedProduct = await Category.findOneAndUpdate({ _id: categoryId }, { is_deleted: true });

		if (!updatedProduct) {
			throw new ApiError(404, "Category not found.");
		}

		res.json(new ApiResponse(200, { id: categoryId }, "Category deleted successfully."));
	}
);
