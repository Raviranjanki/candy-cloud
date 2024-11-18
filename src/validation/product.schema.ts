import { z } from "zod";

const productSchema = z.object({
	name: z.string({ required_error: "Name is required" }).min(3, "Name must contain at least 3 characters"),
	slug: z.string({ required_error: "Slug is required" }).min(3, "Slug must contain at least 3 characters"),
	description: z
		.string({ required_error: "Description is required" })
		.min(3, "Description must contain at least 3 characters"),
	price: z.number({ required_error: "Price is required" }),
	category: z.string({ required_error: "Category is required" }),
	thumbnail_url: z.string({ required_error: "Thumbnail URL is required" }),
	stock_quantity: z.number({ required_error: "Stock quantity is required" }),
	rating: z.number({ required_error: "Rating is required" }),
});

export const createProductSchema = z.object({
	body: productSchema,
});

export const updateProductSchema = z.object({
	body: productSchema.partial(),
	params: z.object({
		id: z.string({ required_error: "Product ID is required" }),
	}),
});

export type CreateProductBodyType = z.infer<typeof createProductSchema>["body"];
export type UpdateProductBodyType = z.infer<typeof updateProductSchema>["body"];
export type UpdateProductParamsType = z.infer<typeof updateProductSchema>["params"];
