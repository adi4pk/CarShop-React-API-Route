import type { CarItem } from "../modules/CarItem";
import type { CarsResponseList } from "../modules/CarsResponseList";
import type { CreateCarResponse } from "../modules/CreateCarResponse";

type HttpMethod="GET"|"POST"|"PUT"|"DELETE";

async function api<T>(path="", method:HttpMethod="GET", body:CarItem | CreateCarResponse | null):Promise<T>{

    const base = "http://localhost:8080/api";
    const url = `${base}${path}`


    const headers: Record<string, string>={
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With' : "XMLHttpRequest",
    }

    const options: RequestInit={
        method,
        headers
    };

    if(body!==null){
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    return response.json() as Promise<T>;
}

export async function getCars():Promise<CarsResponseList>{
    return api<CarsResponseList>("/cars", "GET", null);
}
export async function getCarById(id:string):Promise<CarItem>{
    return api<CarItem>("/cars/"+id, "GET", null);
}