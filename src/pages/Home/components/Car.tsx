import { Link } from "react-router-dom";
import type { CarItem } from "../../../models/CarItem";

type CarProps={
    car: CarItem;
}

function Car({car}: CarProps){
    return (
        <>
            <tr>
				<td>
					<Link to={`/edit-car/${car.id}/alex`}>{car.brand}</Link>
				</td>
				<td>{car.model}</td>
				<td>{car.color}</td>
				<td>{car.size}</td>
				<td>{car.year}</td>
				<td>{car.price}</td>
				<td>{car.mileage}</td>
				<th>{car.fuelType}</th>
				<td>{car.transmission}</td>
				<td>{car.available ? "yes" : "No"}</td>
			</tr>
        </>
    )
}

export default Car;
