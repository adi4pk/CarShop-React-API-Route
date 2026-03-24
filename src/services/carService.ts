import type { ApiErrorResponse } from "../models/ApiErrorResponse";
import type { CarItem } from "../models/CarItem";
import type { CarsResponseList } from "../models/CarsResponseList";
import type { CreateCarRequest } from "../models/CreateCarRequest";
import type { CreateCarResponse } from "../models/CreateCarResponse";
import type { EditCarRequest } from "../models/EditCarRequest";
import type { EditCarResponse } from "../models/EditCarResponse";

const API_BASE_URL = "http://127.0.0.1:8080/api";

export type ApiRequestError = {
  status: number;
  code: string;
  message: string;
  hint: string;
  details: ApiErrorResponse["details"] ;
};

export function isApiRequestError(error: unknown): error is ApiRequestError {
  return typeof error === "object" && error !== null && "status" in error && "message" in error;
}

async function throwRequestError(response: Response) {
  let errorData: ApiErrorResponse | null = null;
  let textResponse = "";

  try {
    errorData = (await response.json()) as ApiErrorResponse;
  } catch {
    textResponse = await response.text();
  }

  throw {
    status: response.status,
    code: errorData?.code ?? "REQUEST_FAILED",
    message: errorData?.message || textResponse || `Request failed with status ${response.status}`,
    hint: errorData?.hint ?? "",
    details: errorData?.details ?? null,
  } satisfies ApiRequestError;
}

export async function getCars(): Promise<CarsResponseList> {
  const response = await fetch(`${API_BASE_URL}/cars`);

  if (!response.ok) {
    await throwRequestError(response);
  }

  return await response.json();
}

export async function getCarById(id: string): Promise<CarItem> {
  const response = await fetch(`${API_BASE_URL}/cars/${id}`);

  if (!response.ok) {
    await throwRequestError(response);
  }

  return await response.json();
}

export async function addCar(car: CreateCarRequest): Promise<CreateCarResponse> {
  const response = await fetch(`${API_BASE_URL}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    await throwRequestError(response);
  }

  return await response.json();
}

export async function editCar(car: EditCarRequest, id: string): Promise<EditCarResponse> {
  const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    await throwRequestError(response);
  }

  return await response.json();
}
