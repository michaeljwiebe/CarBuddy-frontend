import React, { Component } from "react";
import axios from "axios";

class userReservations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allReservations: props.allReservations,
			cars: props.cars,
			userId: props.userId,
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
		let myReservationsHeader;

		if (this.state.viewUserReservations === true) {
			myReservationsHeader = "My Reservations";
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
								<div>
									Total cost: $
									{reservationCar[0].price / 24 * reservation.reservation_hours}
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
					return car.owner_id === this.state.userId;
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
			myReservationsHeader = "My Car's Reservations";
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
			<div className="reservations-viewer">
				<div className="reservations-header">{myReservationsHeader}</div>
				<div onClick={this.viewCarReservations} className="btn">
					My Car's Reservations
				</div>
				<div onClick={this.viewUserReservations} className="btn">
					My Reservations
					<div>{userCarReservationDivs}</div>
					<div>{userReservationsDivs}</div>
				</div>
			</div>
		);
	}
	cancelCarReservation(event) {
		axios({
			method: "delete",
			url: "https://carbuddy.herokuapp.com/reservations/" + event.target.value
		}).then(
			function(response) {
				let userReservations = this.setUserReservations(response.data);

				this.setState({
					allReservations: response.data,
					userReservations: userReservations,
					viewUserReservations: false,
					viewCarReservations: true
				});
			}.bind(this)
		);
	}
	cancelUserReservation(event) {
		axios({
			method: "delete",
			url: "https://carbuddy.herokuapp.com/reservations/" + event.target.value
		}).then(
			function(response) {
				let userReservations = this.setUserReservations(response.data);
				this.setState({
					allReservations: response.data,
					userReservations: userReservations,
					viewUserReservations: true,
					viewCarReservations: false
				});
			}.bind(this)
		);
	}
	setUserReservations(allReservations) {
		// sorts reservations and returns only user's reservations
		let reservations = allReservations.filter(
			function(reservation) {
				return parseInt(reservation.renter_id) === this.state.userId;
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
