import type { CarItem } from "../models/CarItem";
import type { CarsResponseList } from "../models/CarsResponseList";
import type { CreateCarResponse } from "../models/CreateCarResponse";
import type { CreateCarRequest } from "../models/CreateCarRequest";
import type { ApiErrorResponse } from "../models/ApiErrorResponse";
import type { EditCarRequest } from "../models/EditCarRequest";
import type {EditCarResponse} from "../models/EditCarResponse";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiRequestError extends Error {
  status: number;
  code: string;
  hint: string;
  details: ApiErrorResponse["details"];

  constructor(error: Partial<ApiErrorResponse> & { message: string; status: number }) {
    super(error.message);     //Error constructor does NOT accept a name parameter - the signature is new Error(message?: string)
    this.name = "ApiRequestError";      //MUST override the .name inside Error's constructor -- because javaScript does not override it based on your class name.
    this.status = error.status;
    this.code = error.code ?? "REQUEST_FAILED";
    this.hint = error.hint ?? "";
    this.details = error.details ?? null;
  }
}

async function api<T>(
  path = "",
  method: HttpMethod = "GET",
  body: CarItem | CreateCarRequest | null,
): Promise<T> {
  const base = "http://127.0.0.1:8080/api";
  const url = `${base}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
  };

  const options: RequestInit = {
    method,
    headers,
  };


  if (body !== null) {
    options.body = JSON.stringify(body);
  }


  const response = await fetch(url, options);

  const contentType = response.headers.get("content-type");

  let data: T | ApiErrorResponse | null = null;
  let textResponse = "";

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    textResponse = await response.text();
  }

  if (!response.ok) {
    const errorData = data as ApiErrorResponse;
    throw new ApiRequestError({
      status: response.status,
      code: errorData?.code,
      message: errorData?.message || textResponse || `Request failed with status ${response.status}`,
      hint: errorData?.hint,
      details: errorData?.details,
    });
  }

  
  return data as T;
}

export async function getCars(): Promise<CarsResponseList> {
  return api<CarsResponseList>("/cars", "GET", null);
}
export async function getCarById(id: string): Promise<CarItem> {
  return api<CarItem>("/cars/" + id, "GET", null);
}

export async function addCar(car: CreateCarRequest): Promise<CreateCarResponse> {
  return api<CreateCarResponse>("/cars", "POST", car);
}

export async function editCar(car: EditCarRequest, id:string) : Promise<EditCarResponse> {
  return api<EditCarResponse>(`/cars/${id}`, "PUT", car);
}

export async function deleteCar(id:string) : Promise<void> {
  return api<void>(`/cars/${id}`, "DELETE", null);
}