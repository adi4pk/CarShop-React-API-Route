import { useEffect, useState } from "react";
import type { CarItem } from "../../models/CarItem";
import { RouterContextProvider, useNavigate, useParams } from "react-router-dom";
import { getCarById } from "../../services/carService";
import { editCar } from "../../services/carService";
import { deleteCar } from "../../services/carService";
import type { EditCarRequest } from "../../models/EditCarRequest";

function EditCar(){

    const navigate = useNavigate();

    const {id,mama}=useParams();
    const [car,setCar]=useState<CarItem>();




    const [brandInptValue, setBrandInptValue] = useState("");
    const [modelInptValue, setModelInptValue] = useState("");
    const [colorInptValue, setColorInptValue] = useState("");
    const [yearInptValue, setYearInptValue] = useState(0);
    const [priceInptValue, setPriceInptValue] = useState(0);
    const [mileageInptValue, setMileageInptValue] = useState(0);
    const [sizeInptValue, setSizeInptValue] = useState(0);
    const [fuelTypeInptValue, setFuelTypeInptValue] = useState("");
    const [transmissionInptValue, setTransmissionInptValue] = useState("");
    const [isAvailable, setIsAvailable] = useState(Boolean);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(()=>{

        console.log(mama);
         fetchCar();
    },[])

    async function fetchCar(){

        let car= await getCarById(id??'');

        setCar(car);

        setBrandInptValue(car.brand);
        setModelInptValue(car.model);
        setColorInptValue(car.color);
        setSizeInptValue(car.size);
        setYearInptValue(car.year);
        setPriceInptValue(car.price);
        setMileageInptValue(car.mileage);
        setFuelTypeInptValue(car.fuelType);
        setTransmissionInptValue(car.transmission);
        setIsAvailable(car.available);

    }

    async function handleEditCar(){
        

        let carObj:EditCarRequest={
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

        console.log(carObj)

        
        setBrandInptValue(carObj.brand);
        setModelInptValue(carObj.model);
        setColorInptValue(carObj.color);
        setSizeInptValue(carObj.size);
        setYearInptValue(carObj.year);
        setPriceInptValue(carObj.price);
        setMileageInptValue(carObj.mileage);
        setFuelTypeInptValue(carObj.fuelType);
        setTransmissionInptValue(carObj.transmission);
        setIsAvailable(carObj.available);
        
        editCar(carObj,car?.id+"");
        navigate('/');
    }


    async function handleDeleteCar(){
        deleteCar(car?.id+"");      //3 + "" => "3" -- number to string
        navigate('/');
    }





    return (
        <>
        <h1>Update Book {car?.brand}</h1>
    <form>
        <p>
            <label htmlFor="brand">Brand</label>
            <input name="brand" type="text" id="brand"
            defaultValue={car?.brand}
            onChange={(event) => setBrandInptValue(event.target.value)}
            ></input>

        </p>

        
        <p>
            <label htmlFor="model">Model</label>
            <input name="model" type="text" id="model"
            defaultValue={car?.model}
            onChange={(event) => setModelInptValue(event.target.value)}></input>
        </p>
        
        <p>
            <label htmlFor="color">Color</label>
            <input name="color" type="text" id="color"
            value={colorInptValue}
            onChange={(event) => setColorInptValue(event.target.value)}></input>
        </p>
        
        <p>
            <label htmlFor="year">Year</label>
            <input name="year" type="number" id="year" min="1886"
            defaultValue={car?.year}
            onChange={(event) => setYearInptValue(event.target.valueAsNumber)}></input>
        </p>

        

        <p>
            <label htmlFor="price">Price</label>
            <input name="price" type="number" id="price" min="0"
            defaultValue={car?.price}
            onChange={(event) => setPriceInptValue(event.target.valueAsNumber)}
            ></input>
        </p>

        


        <p>
            <label htmlFor="mileage">Mileage</label>
            <input name="mileage" type="number" id="mileage" min="0"
            defaultValue={car?.mileage}
            onChange={(event) => setMileageInptValue(event.target.valueAsNumber)}
            ></input>

        </p>
        


        <p>
            <label htmlFor="size">Size</label>
            <input name="size" type="number" id="size" min="1"
            defaultValue={car?.size}
            onChange={(event) => setSizeInptValue(event.target.valueAsNumber)}
            ></input>
           
        </p>


        <p>
            <label htmlFor="fuelType">Fuel Type</label>
            <input name="fuelType" type="text" id="fuelType"
            defaultValue={car?.fuelType}
            onChange={(event) => setFuelTypeInptValue(event.target.value)}
            ></input>
           
        </p>

        <p>
            <label htmlFor="transmission">transmission</label>
            <input name="transmission" type="text" id="transmission"
            defaultValue={car?.transmission}
            onChange={(event) => setTransmissionInptValue(event.target.value)}></input>
            
        </p>


        <p>
            <label htmlFor="available">available</label>
            <input name="available" type="checkbox" id="available"
            checked={isAvailable}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsAvailable(event.target.checked)}
            ></input>
            
        </p>

        <p>
            <button type="button" className="button" onClick={handleEditCar} disabled={isSubmitting}> Save Changes
                {/* {isSubmitting ? "Saving..." : "Add New Car"} */}
            </button>
            
        </p>

        <p>
            <button type="button" className="button">Cancel</button>
        </p>

        <p>
            <button type="button" className="button" onClick={handleDeleteCar}>Delete Car</button>
        </p>
    </form>
    </>
    )
}

export default EditCar;
