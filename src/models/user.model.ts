import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		address: {
			type: String,
		},
		phone_number: {
			type: Number,
			required: true,
			unique: true,
		},
		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified(this.password)) return next();
	const salt = await bcrypt.genSalt(12);
	const hashPassword = await bcrypt.hash(this.password, salt);
	this.password = hashPassword;
	next();
});

export const User = mongoose.model("User", userSchema);
