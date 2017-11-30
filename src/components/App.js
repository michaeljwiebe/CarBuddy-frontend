//This component controls the app. All other components are rendered inside it and the values in its state determine what the end user sees. This component performs almost all of the API calls using axios or fetch. All of the CSS is also imported into this component for simplicity's sake.

import React, { Component } from "react";
import _ from 'lodash';
import axios from "axios";
import firebase from 'firebase';
import { connect } from 'react-redux';

import "../css/App.css";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddCar from "./AddCar";
import EditUser from "./EditUser";
import UserReservations from "./UserReservations";
import StartReservation from "./StartReservation";
import StartReview from "./StartReview";
import EditReview from "./EditReview";
import GoogleMap from "./GoogleMap";
import MyCars from "./MyCars";
import CarList from './CarList';

import { 
	carsFetch, 
	reviewsFetch
} from '../actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//these are the user's coordinates used for centering map and updating car locations
			lat: "",
			lng: "",
			//these values control what the end user sees on the screen.
			signUp: false,
			signIn: true,
			userImage: null,
			user: null,
			viewCarsAndReviews: false,
			viewMyCars: false,
			carToReview: null,
			reviewToEdit: null,
			reserveCar: false,
			addCar: false,
			viewReservations: false,
			editUser: false
		};
		//binding 'this' to functions in this way fixes the current context to the function allowing it to be called with the correct context from other components
		// this.signIn = this.signIn.bind(this);
		this.signUp = this.signUp.bind(this);
		this.signOut = this.signOut.bind(this);
		this.editUser = this.editUser.bind(this);
		this.updateUserInfo = this.updateUserInfo.bind(this);
		this.modifyURL = this.modifyURL.bind(this);
		this.uploadUserImage = this.uploadUserImage.bind(this);
		this.uploadCarImage = this.uploadCarImage.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.startReservation = this.startReservation.bind(this);
		// this.makeReservation = this.makeReservation.bind(this);
		this.startReview = this.startReview.bind(this);
		this.viewReservations = this.viewReservations.bind(this);
		this.editReview = this.editReview.bind(this);
		this.updateReview = this.updateReview.bind(this);
		this.viewCarsAndReviews = this.viewCarsAndReviews.bind(this);
		this.viewMyCars = this.viewMyCars.bind(this);
		this.openAddCar = this.openAddCar.bind(this);
		this.updateCarCoordinates = this.updateCarCoordinates.bind(this);
		this.getCurrentCoordinates = this.getCurrentCoordinates.bind(this);
		this.resetState = this.resetState.bind(this);
	}


	render() {
		//the variables that are being used to control the render are declared near to where they are used for debuggability and readabily's sake. They initially will have no values because they will be assigned values inside the render depending on the state of the app.

		//the values of below variables are first controlled by the state of the user which is the user object if the user is signed in or null if not.
		let signInComponent;
		let signUpBtn;
		let signUpComponent;
		if (this.props.user === null) {
			var logoText = "logo logo-sign-in-text";
			var logoImage = "logo logo-sign-in-image";
			var userAvatar = null;
			var openReviewEditor = null;

			if (this.state.signIn === true) {
				signUpBtn = (
					<div className="btn btn-sign-up" onClick={this.signUp}>
						Sign Up
					</div>
				);
				signInComponent = (
					<div>
						<SignIn /> {signUpBtn}{" "}
					</div>
				);
			}

			if (this.state.signUp === true) {
				signUpComponent = <SignUp />;
			}
		}

		if (this.props.user !== null) {
			//on user sign-in, these variables are given values. Button variables will not change values.
			userAvatar = this.props.userImage;
			logoText = "logo logo-main-text";
			logoImage = "logo logo-main-image";
			var logoContainer = "logo logo-main-container";
			var hamburgerIcon = (
				<div onClick={this.hamburgerToggle} className=" btn hamburger-show-btn">
					<i className="fa fa-bars" aria-hidden="true" />
				</div>
			);
			//the three buttons directly below get rendered inside the hamburger variable following them. I chose to do this in order to increase modularity and make it possible to put the same buttons in other places very easily. In the future I might build out a button component that I can pass styles to and a function to call when clicked
			var addCarBtn = (
				<div className="hamburger-btn" onClick={this.openAddCar}>
					Add a car
				</div>
			);
			var editUserBtn = (
				<div className="hamburger-btn" onClick={this.editUser}>
					Edit User
				</div>
			);
			var signOutBtn = (
				<div className="hamburger-btn" onClick={this.signOut}>
					Sign Out
				</div>
			);
			var hamburger = (
				<div className="hamburger flex">
					<img src={userAvatar} className="user-avatar" alt="user" />
					<div className="hamburger-btns-container">
						{addCarBtn}
						{editUserBtn}
						{signOutBtn}
					</div>
					<div onClick={this.hamburgerToggle} className="hamburger-close-btn">
						<i className="fa fa-window-close-o" aria-hidden="true" />
					</div>
				</div>
			);

			//three of four buttons below (either All Cars or My Cars) are always rendered at the bottom of the screen when the user is signed in.

			var userReservationsBtn = (
				<div className="btn footer-menu-btn btn-reservations" onClick={this.viewReservations}>
					Reservations
				</div>
			);
			var startCarReservationBtn = (
				<div className="btn footer-menu-btn btn-find-car" onClick={this.startReservation}>
					Find a car
				</div>
			);
			var welcomeMsg = <div className="welcome-msg">Welcome {this.props.user.displayName}!</div>;

			if (this.state.reserveCar === true) {
				var newReservation = (
					<StartReservation
						inputs={true}
					/>
				);
			}

			if (this.state.carToReview !== null) {
				var newReview = (
					<StartReview carToReview={this.state.carToReview} startReview={this.startReview} />
				);
			}

			if (this.state.reviewToEdit !== null) {
				openReviewEditor = (
					<EditReview reviewToEdit={this.state.reviewToEdit} updateReview={this.updateReview} />
				);
			}

			if (this.state.editUser || this.state.addCar || this.state.carToReview) {
				var contentContainerClasses = "content-container";
			}

			if (this.state.viewReservations || this.state.reserveCar || this.state.viewMyCars) {
				contentContainerClasses = "content-container reservations-and-reserve-container";
			}

			if (this.state.editUser === true) {
				var editUser = (
					<EditUser
						user={this.props.user}
						deleteUser={this.deleteUser}
						updateUserInfo={this.updateUserInfo}
					/>
				);
			}

			if (this.state.addCar === true) {
				var addCar = (
					<AddCar
						addCar={this.addCar}
						getCurrentCoordinates={this.getCurrentCoordinates}
						lat={this.state.lat}
						lng={this.state.lng}
					/>
				);
			}

			if (this.state.viewReservations === true) {
				var userReservations = (
					<UserReservations
						allReservations={this.state.reservations}
						userId={this.props.user.id}
						cars={this.state.cars}
					/>
				);
			}

			// all cars or my cars button control
			var carsBtn = (
				<div onClick={this.viewCarsAndReviews} className="btn footer-menu-btn btn-cars">
					All Cars
				</div>
			);
			if (this.state.viewMyCars === true) {
				var myCars = (
					<MyCars
						cars={this.state.cars}
						userId={this.props.user.uid}
						updateCarCoordinates={this.updateCarCoordinates}
						deleteCar={this.deleteCar}
					/>
				);
			}

			if (this.state.viewCarsAndReviews === true) {
				carsBtn = (
					<div onClick={this.viewMyCars} className="btn footer-menu-btn btn-my-cars">
						My Cars
					</div>
				);
				var allCars = <CarList cars={this.props.cars} />

				let bigMap = {
					position: "relative",
					width: "100%",
					maxWidth: "500px",
					height: "20vh",
					margin: "0 auto",
					top: "98px",
					zIndex: "3",
					borderBottom: "1px solid black",
					borderTop: "1px solid black"
				};
				let bigMapZoom = 12;
				var googleMap = (
					<GoogleMap
						styles={bigMap}
						zoom={bigMapZoom}
						cars={this.props.cars}
						lat={this.state.lat}
						lng={this.state.lng}
					/>
				);
			}
			var footer = (
				<div className="footer-menu flex">
					{userReservationsBtn}
					{startCarReservationBtn}
					{carsBtn}
				</div>
			);
		}

		const user = firebase.auth().currentUser;

		//this is the return portion of the app's render function. The values of the variables below as well as their styles are set in the logic above.
		return (
			<div className="App">
				<div>
					<div className="header">
						<div className={logoContainer}>
							<div className={logoImage}>
								<i className="fa fa-car" aria-hidden="true" />
							</div>
							<div className={logoText}>carBuddy</div>
						</div>
						{hamburgerIcon}
					</div>
					{welcomeMsg}
					<div className="signinup-container">{signInComponent}</div>
					<div>{signUpComponent}</div>
				</div>
				{hamburger}
				<div>
					<div className={contentContainerClasses}>
						{googleMap}
						{addCar}
						{newReview}
						{newReservation}
						{allCars}
						{editUser}
						{userReservations}
						{openReviewEditor}
						{myCars}
					</div>
					{footer}
				</div>
			</div>
		);
	}

	// if (this.state.loading === true) {
	// 	loadIcon = <i className="fa fa-cog fa-spin fa-3x fa-fw" />;
	// }


	hamburgerToggle() {
		let hamburgerMenu = document.getElementsByClassName("hamburger")[0];
		hamburgerMenu.classList.toggle("hamburger-show");
	}

	resetState(){
		this.setState({
			addCar: false,
			carToReview: null,
			reviewToEdit: null,
			reserveCar: false,
			viewCarsAndReviews: false,
			viewReservations: false,
			editUser: false,
			viewMyCars: false
		})
	}

	viewMyCars() {
		this.setState({
			viewMyCars: true,
			viewCarsAndReviews: false
		});
		this.getCurrentCoordinates();
	}

	openAddCar() {
		this.resetState();
		this.setState({
			addCar: true,
		});
		this.hamburgerToggle();
		this.getCurrentCoordinates();
	}

	getCurrentCoordinates() {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				this.setState({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			}.bind(this)
		);
	}

	updateCarCoordinates(event) {
		axios
			.post("https://carbuddy.herokuapp.com/cars/update_car_coordinates/" + event.target.value, {
				data: {
					lat: this.state.lat,
					lng: this.state.lng
				}
			})
			.then(
				function(response) {
					this.setState({
						cars: response.data
					});
				}.bind(this)
			);
	}

	uploadCarImage() {
		var data = new FormData();
		var imagedata = document.querySelector('input[type="file"]').files[0];

		if (imagedata === undefined) {
			return;
		}

		data.append("data", imagedata);

		fetch("https://carbuddy.herokuapp.com/cars/image", {
			method: "POST",
			body: data
		})
			.then(function(response) {
				return response.json();
			})
			.then(
				function(data) {
					this.loadCars();
				}.bind(this)
			);
	}

	modifyArrayURLs(array) {
		array.forEach(
			function(car) {
				car.avatar_url = this.modifyURL(car.avatar_url);
				return car;
			}.bind(this)
		);
	}

	viewCarsAndReviews() {
		this.resetState();
		this.setState({
			viewCarsAndReviews: true
		});
		this.getCurrentCoordinates();
	}

	viewReservations() {
		this.resetState();
		this.setState({
			viewReservations: true
		});
		this.getCurrentCoordinates();
	}

	updateReview(props) {
		axios({
			method: "patch",
			url: "https://carbuddy.herokuapp.com/reviews/" + props.id,
			params: {
				title: props.title,
				description: props.description,
				rating: props.rating
			}
		}).then(
			function(response) {
				this.setState({
					reviews: response.data,
					reviewToEdit: null,
					viewCarsAndReviews: true
				});
			}.bind(this)
		);
	}

	editReview(event) {
		this.setState({
			reviewToEdit: JSON.parse(event.target.value),
			viewCarsAndReviews: false
		});
		this.getCurrentCoordinates();
	}

	startReview(event) {
		this.resetState();
		this.setState({
			carToReview: JSON.parse(event.target.value)
		});
		this.getCurrentCoordinates();
	}

	// makeReservation(props) {
	// 	axios
	// 		.post("https://carbuddy.herokuapp.com/reservations", {
	// 			data: {
	// 				car_id: props.car_id,
	// 				start_date: props.start_date,
	// 				end_date: props.end_date,
	// 				reservation_hours: props.reservation_hours,
	// 				renter_id: this.props.user.id
	// 			}
	// 		})
	// 		.then(
	// 			function(response) {
	// 				this.resetState();
	// 				this.setState({
	// 					reservations: response.data,
	// 					viewReservations: true
	// 				});
	// 			}.bind(this)
	// 		);
	// }

	startReservation(event) {
		this.resetState();
		this.setState({
			reserveCar: true
		});
		this.getCurrentCoordinates();
	}

	signUp() {
		this.setState({ signUp: true, signIn: false });
	}

	deleteUser() {
		axios({
			method: "delete",
			url: "https://carbuddy.herokuapp.com/users/" + this.props.user.id
		}).then(
			function(response) {
				this.signOut();
			}.bind(this)
		);
	}

	editUser() {
		this.resetState();
		this.setState({
			editUser: true
		});
		this.hamburgerToggle();
		this.getCurrentCoordinates();
	}

	updateUserInfo(props) {
		axios({
			method: "patch",
			url: "https://carbuddy.herokuapp.com/users/" + this.props.user.id,
			params: {
				username: props.username,
				password: props.password,
				name: props.name,
				address: props.address,
				zip: props.zip
			}
		}).then(
			function(response) {
				this.uploadUserImage({ method: "update", id: this.props.user.id });
			}.bind(this)
		);
	}

	uploadUserImage(userInfo) {
		let url;
		if (userInfo.method === "update") {
			url = "https://carbuddy.herokuapp.com/users/update_image/" + userInfo.id;
		} else {
			url = "https://carbuddy.herokuapp.com/users/upload_image";
		}
		var data = new FormData();
		var imagedata = document.querySelector('input[type="file"]').files[0];

		if (imagedata === undefined) {
			return;
		}

		data.append("data", imagedata);

		fetch(url, {
			method: "POST",
			body: data
		})
			.then(function(response) {
				return response.json();
			})
			.then(
				function(data) {
					let imageURL = data.avatar_url.split("");
					let secondHalfUrl = imageURL.splice(32);
					secondHalfUrl.splice(0, 0, "http://carbuddy.s3.amazonaws.com");
					let returningImageURL = secondHalfUrl.join("");

					this.setState({
						userImage: returningImageURL,
						editUser: false,
						viewCarsAndReviews: true
					});
				}.bind(this)
			);
	}

	modifyURL(url) {
		let imageURL = url.split("");
		let secondHalfUrl = imageURL.splice(32);
		secondHalfUrl.splice(0, 0, "http://carbuddy.s3.amazonaws.com");
		let returningImageURL = secondHalfUrl.join("");
		return returningImageURL;
	}

	signOut() {
		firebase.auth().signOut()
			.then(() => console.log('Signed Out'))
			.catch((error) => console.error('Sign Out Error', error));
		this.hamburgerToggle();
		this.resetState();
		this.setState({
			signIn: true
		});
	}

	componentWillMount() {
		this.getCurrentCoordinates();
		this.props.carsFetch();
	}
	// componentWillReceiveProps(nextProps){
	// 	console.log('nextProps', nextProps)
	// }
}

const mapStateToProps = (state) => {
	const { user } = state.auth;
	const cars = _.map(state.carForm.cars, (val, uid) => {
		return { ...val, uid };
	})
	return { user, cars };
}

// export default App;
export default connect(mapStateToProps, { carsFetch, reviewsFetch })(App);
