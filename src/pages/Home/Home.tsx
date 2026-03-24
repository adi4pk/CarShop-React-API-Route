import { useEffect, useState } from "react";
import type { CarItem } from "../../models/CarItem";
import Car from "./components/Car";   // use no {} for components

import { getCars } from "../../services/carService";
import { useNavigate } from "react-router-dom";

function Home(){

   const navigate =useNavigate();

    const [cars, setCars] = useState<CarItem[]>([]);

    useEffect(() =>{
      loadCars();
    }, []);


    async function loadCars(){

      let data = await getCars();

      setCars(data.cars);
    }

    let goToAddCar=()=>{

       navigate("/add-car");
    }

    return (
      <>
        <h1>Cars</h1>
        <p>
          <a className="button"  onClick={goToAddCar}    >
            Create New Car
          </a>
        </p>
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Color</th>
              <th>Size</th>
              <th>Year</th>
              <th>Price</th>
              <th>Mileage</th>
              <th>Fuel Type</th>
              <th>Transmission</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <Car key={car.id} car={car} />    //must add KEY and BOOK
            ))}
          </tbody>
        </table>
      </>
    );











}


export default Home;
