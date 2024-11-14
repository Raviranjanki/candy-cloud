import { NextFunction, Request, Response } from "express";

export const asyncHandler =
	(fn: (req: Request, res: Response, next: NextFunction) => any) =>
	async (req: Request, res: Response, next: NextFunction) =>
		fn(req, res, next).catch(next);
