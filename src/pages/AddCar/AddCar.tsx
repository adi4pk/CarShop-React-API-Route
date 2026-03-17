import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCar, ApiRequestError } from "../../services/carService";
import type { CreateCarRequest } from "../../models/CreateCarRequest";

type FieldErrors = Partial<Record<keyof CreateCarRequest, string>>;

function AddCar(){
    const navigate=useNavigate();

    const [brandInptValue, setBrandInptValue] = useState(""); //???
    const [modelInptValue, setModelInptValue] = useState("");
    const [colorInptValue, setColorInptValue] = useState("");
    const [sizeInptValue, setSizeInptValue] = useState(0);
    const [yearInptValue, setYearInptValue] = useState(0);
    const [priceInptValue, setPriceInptValue] = useState(0);
    const [mileageInptValue, setMileageInptValue] = useState(0);
    const [fuelTypeInptValue, setFuelTypeInptValue] = useState("");
    const [transmissionInptValue, setTransmissionInptValue] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorHint, setErrorHint] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cancelAddCar=() =>{
        navigate("/")
    }


    async function handleAddCar(){
        setErrorMessage("");
        setErrorHint("");
        setFieldErrors({});
        setIsSubmitting(true);

        const carObj : CreateCarRequest={
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
            await addCar(carObj);
            navigate("/");
        }catch(error) {
            if (error instanceof ApiRequestError) {
                setErrorMessage(error.message || "A aparut o eroare la salvarea masinii.");
                setErrorHint(error.hint);

                const validationErrors = error.details?.validationErrors;
                if (validationErrors) {
                    const nextFieldErrors: FieldErrors = {};

                    for (const validationError of validationErrors) {
                        const fieldName = validationError.field as keyof CreateCarRequest;
                        nextFieldErrors[fieldName] = validationError.message;
                    }

                    setFieldErrors(nextFieldErrors);
                }
            } else {
                setErrorMessage("A aparut o eroare la salvarea masinii.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <>
        <h1>New Car</h1>
    <form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {errorHint && <p className="error-hint">{errorHint}</p>}
        <p>
            <label htmlFor="brand">Brand</label>
            <input name="brand" type="text" id="brand"
            onChange={(event) => setBrandInptValue(event.target.value)}
            />
            {fieldErrors.brand && <span className="error field-error">{fieldErrors.brand}</span>}
        </p>
        <p>
            <label htmlFor="model">Model</label>
            <input name="model" type="text" id="model"
            onChange={(event) => setModelInptValue(event.target.value)}/>
            {fieldErrors.model && <span className="error field-error">{fieldErrors.model}</span>}
        </p>
        <p>
            <label htmlFor="color">Color</label>
            <input name="color" type="text" id="color"
            onChange={(event) => setColorInptValue(event.target.value)}/>
            {fieldErrors.color && <span className="error field-error">{fieldErrors.color}</span>}
        </p>
        <p>
            <label htmlFor="year">Year</label>
            <input name="year" type="number" id="year" min="1886"
            onChange={(event) => setYearInptValue(Number(event.target.value))}/>
            {fieldErrors.year && <span className="error field-error">{fieldErrors.year}</span>}
        </p>

        <p>
            <label htmlFor="price">Price</label>
            <input name="price" type="number" id="price" min="0"
            onChange={(event) => setPriceInptValue(Number(event.target.value))}
            />
            {fieldErrors.price && <span className="error field-error">{fieldErrors.price}</span>}
        </p>


        <p>
            <label htmlFor="mileage">Mileage</label>
            <input name="mileage" type="number" id="mileage" min="0"
            onChange={(event) => setMileageInptValue(Number(event.target.value))}/>
            {fieldErrors.mileage && <span className="error field-error">{fieldErrors.mileage}</span>}
        </p>


        <p>
            <label htmlFor="size">Size</label>
            <input name="size" type="number" id="size" min="1"
            onChange={(event) => setSizeInptValue(Number(event.target.value))}
            />
            {fieldErrors.size && <span className="error field-error">{fieldErrors.size}</span>}
        </p>


        <p>
            <label htmlFor="fuelType">Fuel Type</label>
            <input name="fuelType" type="text" id="fuelType"
            onChange={(event) => setFuelTypeInptValue(event.target.value)}/>
            {fieldErrors.fuelType && <span className="error field-error">{fieldErrors.fuelType}</span>}
        </p>

        <p>
            <label htmlFor="transmission">transmission</label>
            <input name="transmission" type="text" id="transmission"
            onChange={(event) => setTransmissionInptValue(event.target.value)}/>
            {fieldErrors.transmission && <span className="error field-error">{fieldErrors.transmission}</span>}
        </p>


        <p>
            <label htmlFor="available">available</label>
            <input name="available" type="checkbox" id="available"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsAvailable(event.target.checked)}/>
        </p>

        <p>
            <button type="button" className="button" onClick={handleAddCar} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Add New Car"}
            </button>
        </p>
        <p>
            <button type="button" className="button" onClick={cancelAddCar}>Cancel</button>
        </p>
    </form>
        </>
    )
}

export default AddCar;
