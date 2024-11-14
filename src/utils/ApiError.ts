export class ApiError extends Error {
	statusCode: number;
	success: boolean;
	data: null;
	errors: any;
	message: string;

	constructor(statusCode = 500, message = "Something went wrong! try again.", errors = [], stack = "") {
		super(message);
		this.message = message;
		this.statusCode = statusCode;
		this.success = false;
		this.data = null;
		this.errors = errors;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
