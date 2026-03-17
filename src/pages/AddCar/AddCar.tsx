import { useState } from "react";
import type { CarItem } from "../../models/CarItem";
import { useNavigate } from "react-router-dom";
import {addCar} from "../../services/carService";
import type { CreateCarRequest } from "../../models/CreateCarRequest";

type addCarProps={

}

function AddCar(){

    let navigate=useNavigate();


    let cancelAddCar=() =>{
        navigate("/")
    }

    const [car, setCar] = useState<CarItem>();

    const [brandInptValue, setBrandInptValue] = useState(""); //???
    const [modelInptValue, setModelInptValue] = useState("");
    const [colorInptValue, setColorInptValue] = useState("");
    const [sizeInptValue, setSizeInptValue] = useState(0);
    const [yearInptValue, setYearInptValue] = useState(0);
    const [priceInptValue, setPriceInptValue] = useState(0);
    const [mileageInptValue, setMileageInptValue] = useState(0);
    const [fuelTypeInptValue, setFuelTypeInptValue] = useState("");
    const [transmissionInptValue, setTransmissionInptValue] = useState("");
    const [isAvailable, setIsAvailable] = useState(Boolean);


    function handleAddCar(){

        let carObj : CreateCarRequest={
        brand: brandInptValue,
        model: modelInptValue,
        color: colorInptValue,
        size: sizeInptValue,
        year: yearInptValue,
        price: priceInptValue,
        mileage: mileageInptValue,
        fuelType: fuelTypeInptValue,
        transmission: transmissionInptValue,
        available: isAvailable,
    }

    // console.log(carObj);

        try{
            let resp=   addCar(carObj);
        }catch(error) {
        if (error instanceof Error) {
            console.log("Eroare:", error.message);
            }
        }
    }

    return(
        <>
        <h1>New Book</h1>
    <form>
        <p>
            <label htmlFor="brand">Brand</label>
            <input name="brand" type="text" id="brand"
            onChange={(event) => setBrandInptValue(event.target.value)}
            />
        </p>
        <p>
            <label htmlFor="model">Model</label>
            <input name="model" type="text" id="model"
            onChange={(event) => setModelInptValue(event.target.value)}/>
        </p>
        <p>
            <label htmlFor="color">Color</label>
            <input name="color" type="text" id="color"
            onChange={(event) => setColorInptValue(event.target.value)}/>
        </p>
        <p>
            <label htmlFor="year">Year</label>
            <input name="year" type="text" id="year" min="1886"
            onChange={(event) => setYearInptValue(Number(event.target.value))}/>
        </p>

        <p>
            <label htmlFor="price">Price</label>
            <input name="price" type="text" id="price" min="1"
            onChange={(event) => setPriceInptValue(Number(event.target.value))}
            />
        </p>


        <p>
            <label htmlFor="mileage">Mileage</label>
            <input name="mileage" type="text" id="mileage" min="1"
            onChange={(event) => setMileageInptValue(Number(event.target.value))}/>
        </p>


        <p>
            <label htmlFor="size">Size</label>
            <input name="size" type="text" id="size" min="1"
            onChange={(event) => setSizeInptValue(Number(event.target.value))}
            />
        </p>


        <p>
            <label htmlFor="fuelType">Fuel Type</label>
            <input name="fuelType" type="text" id="fuelType"
            onChange={(event) => setFuelTypeInptValue(event.target.value)}/>
        </p>

        <p>
            <label htmlFor="transmission">transmission</label>
            <input name="transmission" type="text" id="transmission"
            onChange={(event) => setTransmissionInptValue(event.target.value)}/>
        </p>


        <p>
            <label htmlFor="available">available</label>
            <input name="available" type="checkbox" id="available"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsAvailable(event.target.checked)}/>
        </p>

        <p>
            <a className="button" onClick={handleAddCar}> Add New Car </a> 
        </p>
        <p>
            <a className="button" onClick={cancelAddCar}>Cancel</a>
        </p>
    </form>
        </>
    )
}

export default AddCar;