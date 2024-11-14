import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const errorController = async (error: any, req: Request, res: Response, next: NextFunction) => {
	error.statusCode = error.statusCode || 500;
	error.status = error.status || "error";
	res.status(error.statusCode).json({ ...error, message: error.message });
};
