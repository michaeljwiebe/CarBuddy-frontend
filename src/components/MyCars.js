// function MyCars(cars, userId) {
// 	let userCars = cars.filter(function(car) {
// 		return car.owner_id === userId;
// 	});
// 	console.log(userCars);
// }

import React, { Component } from "react";

import "../css/my-cars.css";

class MyCars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cars: props.cars,
			userId: props.userId
		};
	}
	render() {
		let userCars = this.state.cars.filter(
			function(car) {
				return car.owner_id === this.state.userId;
			}.bind(this)
		);
		console.log(userCars);
		console.log(this.state);
		return (
			<div>
				My Cars Page
				<button onClick={this.props.getCurrentCoordinates} className="btn btn-wide">
					Update Car Location
				</button>
			</div>
		);
	}
	handleUpdateCarCoordinates() {
		this.props.getCurrentCoordinates();
	}
}

export default MyCars;
