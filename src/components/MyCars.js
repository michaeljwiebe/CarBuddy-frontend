// function MyCars(cars, userId) {
// 	let userCars = cars.filter(function(car) {
// 		return car.owner_id === userId;
// 	});
// 	console.log(userCars);
// }

import React, { Component } from "react";

import "../css/my-cars.css";

import GoogleMap from "./GoogleMap";

class MyCars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cars: props.cars,
			userId: props.userId
		};
		this.handleUpdateCarCoordinates = this.handleUpdateCarCoordinates.bind(this);
	}
	render() {
		let userCars = this.state.cars.filter(
			function(car) {
				return car.owner_id === this.state.userId;
			}.bind(this)
		);
		let userCarDivs = userCars.map(
			function(car) {
				let updateCoordinatesBtn = (
					<button
						onClick={this.handleUpdateCarCoordinates}
						className="btn btn-update-my-car-coordinates"
						value={car.id}
					>
						Update Car Location
					</button>
				);
				let myCarsMapStyles = {
					position: "relative",
					width: "60%",
					maxWidth: "350px",
					height: "30vh",
					margin: "10px auto 0",
					zIndex: "3",
					borderBottom: "1px solid black",
					borderTop: "1px solid black"
				};
				let googleMap = (
					<GoogleMap
						styles={myCarsMapStyles}
						zoom={14}
						lat={parseFloat(car.lat)}
						lng={parseFloat(car.lng)}
						cars={[car]}
					/>
				);
				return (
					<div className="user-car">
						<div className="user-car-make-model">{car.year + " " + car.make_model}</div>
						<div className="flex">
							<img className="user-car-img" src={car.avatar_url} alt={car.user.name + "'s car"} />
							<div className="user-car-info">
								<ul className="user-car-info-list">
									<li>MPG: {car.mpg}</li>
									<li>Price: {car.price}</li>
								</ul>
							</div>
						</div>
						{googleMap}
						{/* updateCoordinatesBtn */}
					</div>
				);
			}.bind(this)
		);
		console.log(userCars);
		return (
			<div className="user-cars-container">
				<div>My Cars</div>
				<div className="user-cars">{userCarDivs}</div>
			</div>
		);
	}
	//this successfully passes car id
	handleUpdateCarCoordinates(event) {
		this.props.updateCarCoordinates(event);
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			cars: newProps.cars
		});
	}
}

export default MyCars;
