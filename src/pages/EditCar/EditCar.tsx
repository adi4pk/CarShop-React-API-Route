import { useEffect, useState } from "react";
import type { CarItem } from "../../modules/CarItem";
import { useNavigate, useParams } from "react-router-dom";
import { getCarById } from "../../services/carService";

function EditCar(){

    const {id}=useParams();
    const [car,setCar]=useState<CarItem>();


    useEffect(()=>{

         fetchCar();
    },[])

    async function fetchCar(){

        let car= await getCarById(id??'');

        setCar(car);

    }

    return (
        <>
        <h1>Update Book {car?.brand}</h1>
    <form>
        <p>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" id="title" value="The Hunger Games"/>
        </p>
        <p>
            <label htmlFor="author">Author</label>
            <input name="author" type="text" id="author" value="Suzanne Collins"/>
        </p>
        <p>
            <label htmlFor="genre">Genre</label>
            <input name="genre" type="text" id="genre" value="Fantasy"/>
        </p>
        <p>
            <label htmlFor="year">Year</label>
            <input name="year" type="text" id="year" value="2008"/>
        </p>
        <p>
            <input type="submit" value="Update Book"/>
        </p>
    </form>
    <form method="post" action="/books/8/delete">
        <p>
            <a className="button" href="all_books.html">Cancel</a>
        </p>
        <p><input type="submit" value="Delete Book"/></p>
    </form>
        </>
    )
}

export default EditCar;