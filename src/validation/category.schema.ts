import { z } from "zod";

const categorySchema = z.object({
	name: z.string({ required_error: "Name is required" }).min(3, "Name must contain at least 3 characters"),
	slug: z.string({ required_error: "Slug is required" }).min(3, "Slug must contain at least 3 characters"),
	description: z
		.string({ required_error: "Description is required" })
		.min(3, "Description must contain at least 3 characters"),
	thumbnail_url: z.string({ required_error: "Thumbnail URL is required" }),
});

export const createCategorySchema = z.object({
	body: categorySchema,
});

export const updateCategorySchema = z.object({
	body: categorySchema.partial(),
	params: z.object({
		id: z.string({ required_error: "Category ID is required" }),
	}),
});

export type CreateCategoryBodyType = z.infer<typeof createCategorySchema>["body"];
export type UpdateCategoryBodyType = z.infer<typeof updateCategorySchema>["body"];
export type UpdateCategoryParamsType = z.infer<typeof updateCategorySchema>["params"];
