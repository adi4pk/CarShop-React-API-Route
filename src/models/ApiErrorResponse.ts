export interface ValidationFieldError {
    field: string;
    rejectedValue: unknown;
    message: string;
}

export interface ApiErrorDetails {
    validationErrors?: ValidationFieldError[];
    field?: string;
    parameter?: string;
    rejectedValue?: unknown;
    expectedType?: string;
}

export interface ApiErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    code: string;
    message: string;
    hint: string;
    path: string;
    details: ApiErrorDetails | null;
}
