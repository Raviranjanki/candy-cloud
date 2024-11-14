import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
		},
		thumbnail_url: {
			type: String,
			required: true,
		},
		stock_quantity: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
