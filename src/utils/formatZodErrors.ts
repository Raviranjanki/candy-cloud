import { ZodError } from "zod";

export const formatZodErrors = (errors: ZodError[]) => {
	return errors.map((error) => ({ [error.path[1]]: error.message }));
};
