import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			index: true,
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
		current_rating: {
			type: Number,
			default: 0,
		},
		rating: {
			type: Number,
			default: 0,
		},
		is_deleted: {
			type: Boolean,
			default: false,
		},
		// rating: [
		// 	{
		// 		user: {
		// 			type: "ObjectId",
		// 			ref: "user",
		// 		},
		// 		feedback: String,
		// 		star: Number,
		// 		date: {
		// 			type: Date,
		// 			default: Date.now,
		// 		},
		// 	},
		// ],
	},
	{ timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
