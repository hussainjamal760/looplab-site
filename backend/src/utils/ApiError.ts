export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export class ApiError extends Error {
  public statusCode: number;
  public errors: ApiErrorDetail[];
  public success: boolean;

  constructor(
    statusCode: number,
    message: string = 'Something went wrong',
    errors: ApiErrorDetail[] = [],
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

