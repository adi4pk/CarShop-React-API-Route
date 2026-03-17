import { useState } from "react";
import type { CarItem } from "../../modules/CarItem";
import { useNavigate } from "react-router-dom";


function AddCar(){

    let navigate=useNavigate();


    let cancelAddCar=() =>{
        navigate("/")
    }

    return(
        <>
        <h1>New Book</h1>
    <form>
        <p>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" id="title"/>
        </p>
        <p>
            <label htmlFor="author">Author</label>
            <input name="author" type="text" id="author"/>
        </p>
        <p>
            <label htmlFor="genre">Genre</label>
            <input name="genre" type="text" id="genre"/>
        </p>
        <p>
            <label htmlFor="year">Year</label>
            <input name="year" type="text" id="year"/>
        </p>
        <p>
            <input type="submit" value="Create New Book"/>
        </p>
        <p>
            <a className="button" onClick={cancelAddCar}>Cancel</a>
        </p>
    </form>
        </>
    )
}

export default AddCar;