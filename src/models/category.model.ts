import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
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
		thumbnail_url: {
			type: String,
		},
		is_deleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
