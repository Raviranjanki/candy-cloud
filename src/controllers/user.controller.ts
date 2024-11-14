import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

export const registerHandler = asyncHandler(async (req: Request, res: Response) => {
	const body = req.body;

	throw new ApiError(400, "Email already exists.");
	const existingUser = await User.findOne({ email: body.email });

	if (existingUser) {
	}

	const user = await User.create({
		address: body.address,
		email: body.email,
	});
});
