export class ApiError extends Error {
	statusCode: number;
	success: boolean;
	data: null;

	constructor(
		statusCode = 500,
		message = "Something went wrong! try again.",
		stack = ""
	) {
		super(message);
		this.message = message;
		this.statusCode = statusCode;
		this.success = false;
		this.data = null;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
