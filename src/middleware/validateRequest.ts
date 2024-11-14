import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { formatZodErrors } from "../utils/formatZodErrors";

export const validateRequest = (schema: AnyZodObject) =>
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				params: req.params,
				query: req.query,
			});
			next();
		} catch (error: any) {
			console.log(error.errors);
			const errors = formatZodErrors(error.errors);
			throw new ApiError(400, "", errors);
		}
	});
