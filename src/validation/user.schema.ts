import { z } from "zod";

export const createUserSchema = z.object({
	body: z
		.object({
			name: z.string({ required_error: "Name field is required" }).min(3, "Name should contains 3 chars"),
			email: z.string({ required_error: "Email field is required." }).email("This email is not valid."),
			password: z
				.string({ required_error: "Password field is required" })
				.min(6, "Password should be greater than 6 chars"),
			confirmPassword: z
				.string({ required_error: "Password field is required" })
				.min(6, "Password should be greater than 6 chars"),
			address: z.string({ required_error: "Address field is required" }),
			phoneNumber: z.number({ required_error: "Phone number field is required" }),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Confirm password doesn't match with password",
			path: ["confirmPassword"],
		}),
});
