//date displaying in GMT
//get info to show up on my car reservations?

import React, { Component } from "react";

class userReservations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allReservations: props.allReservations,
			cars: props.cars,
			userReservations: [],
			editReservation: false,
			viewUserReservations: true,
			viewCarReservations: false
		};
		this.viewCarReservations = this.viewCarReservations.bind(this);
		this.viewUserReservations = this.viewUserReservations.bind(this);
		this.editUserReservations = this.editUserReservations.bind(this);
		this.deleteUserReservations = this.deleteUserReservations.bind(this);
		this.deleteCarReservations = this.deleteCarReservations.bind(this);
	}
	render() {
		let userReservationsDivs;
		let reservationCar;
		let startEST;
		let endEST;
		let carReservations;
		let userCarReservationDivs;
		let userCars;
		let userCarIds;
		let userCarReserved;

		if (this.state.viewUserReservations === true) {
			userReservationsDivs = this.state.userReservations.map(
				function(reservation, index) {
					reservationCar = this.state.cars.filter(
						function(car) {
							return car.id === reservation.car_id;
						}.bind(this)
					);
					startEST = new Date(reservation.start_date).toLocaleString();
					endEST = new Date(reservation.end_date).toLocaleString();

					return (
						<div key={index}>
							{reservationCar[0].make_model}
							<div>
								From:
								{" " + startEST + " "}
								until:
								{" " + endEST + " "}
							</div>
						</div>
					);
				}.bind(this)
			);
		}

		if (this.state.viewCarReservations === true) {
			userCars = this.state.cars.filter(
				function(car) {
					return car.owner_id === this.props.user_id;
				}.bind(this)
			);
			console.log(userCars); //works, car objects
			userCarIds = userCars.map(function(userCar) {
				return userCar.id;
			});
			console.log(userCarIds); // works, array of ids
			carReservations = this.state.allReservations.filter(function(reservation) {
				return userCarIds.indexOf(reservation.car_id) > -1;
			});
			console.log(carReservations); // returns reservations array
			userCarReservationDivs = carReservations.map(function(reservation, index) {
				userCarReserved = userCars.filter(function(car) {
					return reservation.car_id === car.id;
				});
				console.log(userCarReserved); // returns car associated with reservation

				startEST = new Date(reservation.start_date).toLocaleString();
				endEST = new Date(reservation.end_date).toLocaleString();
				return (
					<div key={index}>
						<div>{userCarReserved[0].make_model}</div>
						<div>
							From
							{" " + startEST + " "}
							until
							{" " + endEST}
						</div>

					</div>
				);
			});
		}

		return (
			<div>
				<div>{userCarReservationDivs}</div>;
				<div>{userReservationsDivs}</div>;
				<button onClick={this.viewCarReservations}>My Car's Reservations</button>
				<button onClick={this.viewUserReservations}>My Reservations</button>
			</div>
		);
	}
	viewCarReservations() {
		this.setState({
			editReservation: false,
			viewUserReservations: false,
			viewCarReservations: true
		});
	}
	viewUserReservations() {
		this.setState({
			editReservation: false,
			viewUserReservations: true,
			viewCarReservations: false
		});
	}
	editUserReservations() {}
	editCarReservations() {}
	deleteUserReservations() {}
	deleteCarReservations() {}
	componentWillMount() {
		let reservations = this.state.allReservations.filter(
			function(reservation) {
				return reservation.renter_id === this.props.user_id;
			}.bind(this)
		);
		this.setState({ userReservations: reservations });
	}
}

export default userReservations;
