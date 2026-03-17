import type { CarItem } from "../models/CarItem";
import type { CarsResponseList } from "../models/CarsResponseList";
import type { CreateCarResponse } from "../models/CreateCarResponse";
import type { CreateCarRequest } from "../models/CreateCarRequest";
import type { ApiErrorResponse } from "../models/ApiErrorResponse";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function api<T>(
  path = "",
  method: HttpMethod = "GET",
  body: CarItem | CreateCarRequest | null,
): Promise<T> {
  const base = "http://localhost:8080/api";
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

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = null;
  }

  if (!response.ok) {
    const errorData = data as ApiErrorResponse;

    console.log(errorData);
    
    throw new Error(
      errorData?.message || ''
      
    );
  }

  
  return data as T;
}

export async function getCars(): Promise<CarsResponseList> {
  return api<CarsResponseList>("/cars", "GET", null);
}
export async function getCarById(id: string): Promise<CarItem> {
  return api<CarItem>("/cars/" + id, "GET", null);
}

export async function addCar(car: CreateCarRequest): Promise<CreateCarRequest> {
  return api<CreateCarResponse>("/cars", "POST", car);
}
