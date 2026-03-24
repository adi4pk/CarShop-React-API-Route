export interface ValidationFieldError {     //an ERROR object with 3 properties
    field: string;
    rejectedValue: unknown;
    message: string;
}

export interface ApiErrorDetails {      //each field is optional, due to '?'

    validationErrors?: ValidationFieldError[];      //a list of objects - type ValidationFieldError
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
