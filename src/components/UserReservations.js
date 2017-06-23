import React, { Component } from "react";
import axios from "axios";

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
		this.cancelCarReservation = this.cancelCarReservation.bind(this);
		this.cancelUserReservation = this.cancelUserReservation.bind(this);
		this.setUserReservations = this.setUserReservations.bind(this);
		// this.handleCancelUserReservation = this.handleCancelUserReservation.bind(this);
		// this.handleCancelCarReservation = this.handleCancelCarReservation.bind(this);
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
					reservationCar = this.state.cars.filter(function(car) {
						return car.id === reservation.car_id;
					});
					startEST = new Date(reservation.start_date).toLocaleString();
					endEST = new Date(reservation.end_date).toLocaleString();

					return (
						<div key={index}>
							{reservationCar[0].make_model}
							<div>
								<div>
									{" "}From
									{" " + startEST + " "}
								</div><div>
									{" "}Until
									{" " + endEST + " "}
								</div>
							</div>
							<button onClick={this.cancelUserReservation} value={reservation.id}>
								Cancel Reservation
							</button>
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
			userCarReservationDivs = carReservations.map(
				function(reservation, index) {
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
								<div>
									From
									{" " + startEST + " "}
								</div><div>
									Until
									{" " + endEST}
								</div>
							</div>
							<button onClick={this.cancelCarReservation} value={reservation.id}>
								Cancel Reservation
							</button>

						</div>
					);
				}.bind(this)
			);
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
	cancelCarReservation(event) {
		console.log("cancel car res");
		axios({
			method: "delete",
			url: "/reservations/" + event.target.value
		}).then(
			function(response) {
				let userReservations = this.setUserReservations(response.data);

				this.setState({
					allReservations: response.data,
					userReservations: userReservations
				});
			}.bind(this)
		);
	}
	cancelUserReservation(event) {
		console.log("cancel user's res");
		console.log(event.target.value);

		axios({
			method: "delete",
			url: "/reservations/" + event.target.value
		}).then(
			function(response) {
				let userReservations = this.setUserReservations(response.data);
				this.setState({
					allReservations: response.data,
					userReservations: userReservations
				});
			}.bind(this)
		);
	}
	setUserReservations(allReservations) {
		// sorts reservations and returns only user's
		let reservations = allReservations.filter(
			function(reservation) {
				return reservation.renter_id === this.props.user_id;
			}.bind(this)
		);
		return reservations;
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
	componentWillMount() {
		let userReservations = this.setUserReservations(this.props.allReservations);
		this.setState({ userReservations: userReservations });
	}
}

export default userReservations;
