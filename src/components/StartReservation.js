//This component features my very own date time picker.
//I used js files listing the potential number of days that a month could have as well as the months and years that I wanted to have available to pick.
//I mapped those files into option tags so that I could put them into a a select tag on the frontend
//I then wrote logic to use the correct number of days depending on which month (and year to account for leap years) was selected
//I then built selectors for hour, AM/PM, month, day of the month, and year for both start start and finish of reservations.
//To prevent double-booking I built new Date objects with the data that was selected and converted them into milliseconds so that I could easily determine if the requested reservation times overlapped with any other reservation that was already in the database. This gave me a list of car IDs that the user making the current reservation should not be available to choose.
//I then display the cars that were not listed in the above array as options to reserve.

import React, { Component } from "react";
import GoogleMap from "./GoogleMap";

import "../css/StartReservation.css";

import times from "../times";
import ampm from "../ampm";
import monthDate28 from "../monthDate28";
import monthDate29 from "../monthDate29";
import monthDate30 from "../monthDate30";
import monthDate31 from "../monthDate31";
import months from "../months";
import years from "../years";

class StartReservation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			start_hour: "",
			start_AMPM: "",
			start_day: "",
			start_month: "",
			start_year: "",
			end_day: "",
			end_month: "",
			end_year: "",
			end_hour: "",
			end_AMPM: "",
			start_date: null,
			end_date: null,
			reservation_hours: "",
			inputs: props.inputs,
			carToReserve: null,
			reservations: props.reservations,
			cars: props.cars,
			carsToRender: [],
			availableCars: 0
		};
		this.updateStartHour = this.updateStartHour.bind(this);
		this.ampmHour = this.ampmHour.bind(this);
		this.jsHour = this.jsHour.bind(this);
		this.updateStartAMPM = this.updateStartAMPM.bind(this);
		this.updateStartDay = this.updateStartDay.bind(this);
		this.updateStartMonth = this.updateStartMonth.bind(this);
		this.updateStartYear = this.updateStartYear.bind(this);
		this.updateEndDay = this.updateEndDay.bind(this);
		this.updateEndHour = this.updateEndHour.bind(this);
		this.updateEndAMPM = this.updateEndAMPM.bind(this);
		this.updateEndDay = this.updateEndDay.bind(this);
		this.updateEndMonth = this.updateEndMonth.bind(this);
		this.updateEndYear = this.updateEndYear.bind(this);
		this.handleMakeReservation = this.handleMakeReservation.bind(this);
		this.viewAvailableCars = this.viewAvailableCars.bind(this);
	}

	render() {
		console.log(this.state);
		let daysPerMonthList;
		let textStartMonth;
		let textEndMonth;
		let datesInput;
		let availableCars;
		let timesList = times.map(function(time, index) {
			return <option key={index} value={time}>{time}</option>;
		});
		let ampmsList = ampm.map(function(ampm, index) {
			return <option key={index} value={ampm}>{ampm}</option>;
		});
		let monthList = months.map(function(month, index) {
			return <option key={index} value={month}>{month}</option>;
		});
		let daysList31 = monthDate31.map(function(day, index) {
			return <option key={index} value={day}>{day}</option>;
		});
		let daysList30 = monthDate30.map(function(day, index) {
			return <option key={index} value={day}>{day}</option>;
		});
		let daysList29 = monthDate29.map(function(day, index) {
			return <option key={index} value={day}>{day}</option>;
		});
		let daysList28 = monthDate28.map(function(day, index) {
			return <option key={index} value={day}>{day}</option>;
		});
		let yearsList = years.map(function(year, index) {
			return <option key={index} value={year}>{year}</option>;
		});
		let viewAvailableCarsBtn = (
			<div onClick={this.viewAvailableCars} className="btn btn-view-cars">
				View Cars
			</div>
		);

		if (this.state.start_month % 2 === 1 && this.state.start_month !== 1) {
			daysPerMonthList = daysList30;
		} else if (this.state.start_month === 1 && this.state.start_year % 4 !== 0) {
			daysPerMonthList = daysList28;
		} else if (this.state.start_month === 1 && this.state.start_year % 4 === 0) {
			daysPerMonthList = daysList29;
		} else {
			daysPerMonthList = daysList31;
		}

		//I determined that I needed to convert back and forth from Javascript's notation for date and time to the American system so I wrote the two code blocks below and later functions ampmHour and jsHour to convert months and hours from Javascript to American and vice versa. I realized after writing it that it may not have been necessary if I would have known more about what is possible using javascript's built in Date object. Nonetheless, I wrote it and it works.
		if (this.state.start_month === 0) {
			textStartMonth = "January";
		} else if (this.state.start_month === 1) {
			textStartMonth = "February";
		} else if (this.state.start_month === 2) {
			textStartMonth = "March";
		} else if (this.state.start_month === 3) {
			textStartMonth = "April";
		} else if (this.state.start_month === 4) {
			textStartMonth = "May";
		} else if (this.state.start_month === 5) {
			textStartMonth = "June";
		} else if (this.state.start_month === 6) {
			textStartMonth = "July";
		} else if (this.state.start_month === 7) {
			textStartMonth = "August";
		} else if (this.state.start_month === 8) {
			textStartMonth = "September";
		} else if (this.state.start_month === 9) {
			textStartMonth = "October";
		} else if (this.state.start_month === 10) {
			textStartMonth = "November";
		} else if (this.state.start_month === 11) {
			textStartMonth = "December";
		}

		if (this.state.end_month === 0) {
			textEndMonth = "January";
		} else if (this.state.end_month === 1) {
			textEndMonth = "February";
		} else if (this.state.end_month === 2) {
			textEndMonth = "March";
		} else if (this.state.end_month === 3) {
			textEndMonth = "April";
		} else if (this.state.end_month === 4) {
			textEndMonth = "May";
		} else if (this.state.end_month === 5) {
			textEndMonth = "June";
		} else if (this.state.end_month === 6) {
			textEndMonth = "July";
		} else if (this.state.end_month === 7) {
			textEndMonth = "August";
		} else if (this.state.end_month === 8) {
			textEndMonth = "September";
		} else if (this.state.end_month === 9) {
			textEndMonth = "October";
		} else if (this.state.end_month === 10) {
			textEndMonth = "November";
		} else if (this.state.end_month === 11) {
			textEndMonth = "December";
		}

		if (this.state.inputs === true) {
			datesInput = (
				<div className="flex reservation-inputs-container">
					<div className="reservation-start-inputs">
						<span className="reservation-labels">From</span>
						<br />
						<select
							className="input input-select input-reservation-3em"
							onChange={this.updateStartHour}
							value={this.ampmHour(this.state.start_hour)}
							placeholder="Start Time"
						>
							{timesList}
						</select>
						<select
							className="input input-select input-reservation-3em"
							onChange={this.updateStartAMPM}
							value={this.state.start_AMPM}
						>
							{ampmsList}
						</select>
						<select
							className="input input-select input-reservation-3em"
							onChange={this.updateStartDay}
							value={this.state.start_day}
						>
							{daysPerMonthList}
						</select>
						<select
							className="input input-select input-reservation-month"
							onChange={this.updateStartMonth}
							value={textStartMonth}
						>
							{monthList}
						</select>
						<select
							className="input input-select input-reservation-year"
							onChange={this.updateStartYear}
							value={this.state.start_year}
						>
							{yearsList}
						</select>
					</div>
					<div className="reservation-end-inputs">
						<span className="reservation-labels">Until</span>

						<br />
						<select
							className="input input-select input-reservation-3em"
							onChange={this.updateEndHour}
							value={this.ampmHour(this.state.end_hour)}
							placeholder="End Time"
						>
							{timesList}
						</select>
						<select
							className="input input-select input-reservation-3em"
							onChange={this.updateEndAMPM}
							value={this.state.end_AMPM}
						>
							{ampmsList}
						</select>
						<select
							className="input input-select input-reservation-3em"
							onChange={this.updateEndDay}
							value={this.state.end_day}
						>
							{daysPerMonthList}
						</select>
						<select
							className="input input-select input-reservation-month"
							onChange={this.updateEndMonth}
							value={textEndMonth}
						>
							{monthList}
						</select>
						<select
							className="input input-select input-reservation-year"
							onChange={this.updateEndYear}
							value={this.state.end_year}
						>
							{yearsList}
						</select>
					</div>
					<br />
					{viewAvailableCarsBtn}
				</div>
			);
		} else {
			datesInput = "";
			let pluralCars;
			if (this.state.availableCars.length === 1) {
				pluralCars = <span>is {this.state.availableCars.length} car</span>;
			} else {
				pluralCars = <span>are {this.state.availableCars.length} cars</span>;
			}
			availableCars = (
				<div>
					<div />
					<div className="available-cars">
						There {pluralCars} avaiable for the period you requested.
						{this.state.carsToRender}
					</div>
				</div>
			);
		}
		return (
			<div>
				{datesInput}
				{availableCars}
			</div>
		);
	}

	componentWillMount() {
		let today = new Date();
		if (today.getHours() >= 12) {
			this.setState({ start_AMPM: "PM", end_AMPM: "PM" });
		} else {
			this.setState({ start_AMPM: "AM", end_AMPM: "AM" });
		}
		this.setState({
			start_hour: today.getHours(),
			start_day: today.getDate(),
			start_month: today.getMonth(),
			start_year: today.getYear() + 1900,
			end_hour: today.getHours(),
			end_day: today.getDate(),
			end_month: today.getMonth(),
			end_year: today.getYear() + 1900
		});
	}

	viewAvailableCars() {
		let unAvailableCars;
		let conflictingReservations;
		let carsToRender;
		let carDivsToRender;
		let startDate = new Date(
			this.state.start_year,
			this.state.start_month,
			this.state.start_day,
			this.state.start_hour
		);
		let endDate = new Date(
			this.state.end_year,
			this.state.end_month,
			this.state.end_day,
			this.state.end_hour
		);
		let startMsec = Date.parse(startDate);
		let endMsec = Date.parse(endDate);
		let elapsedHours = (endMsec - startMsec) / 3600000;
		let smallMap = {
			position: "relative",
			width: "60%",
			height: "20vh",
			margin: "0 auto",
			border: "1px solid black"
		};
		let smallMapZoom = 14;
		this.setState(
			{
				reservation_hours: elapsedHours,
				start_date: startDate,
				end_date: endDate,
				inputs: false
			},
			function() {
				conflictingReservations = this.state.reservations.filter(
					function(reservation, index) {
						let dbStart = new Date(reservation.start_date);
						let dbEnd = new Date(reservation.end_date);
						let newResStart = new Date(this.state.start_date);
						let newResEnd = new Date(this.state.end_date);
						return (
							(newResStart > dbStart && newResStart < dbEnd) ||
							(newResEnd > dbStart && newResStart < dbEnd)
						);
					}.bind(this)
				);
				unAvailableCars = conflictingReservations.map(function(conflictingReservation) {
					return conflictingReservation.car_id;
				});
				carsToRender = this.state.cars.filter(function(car) {
					return unAvailableCars.indexOf(car.id) === -1;
				});
				this.setState({ availableCars: carsToRender });

				carDivsToRender = carsToRender.map(
					function(car, index) {
						return (
							<div className="available-car flex">
								<div className="reserve-car-info">
									<div>{car.make_model} - {car.year}</div>
									<img
										src={car.avatar_url}
										className="car-img-large"
										alt="car"
									/>
									<div>MPG: {car.mpg}</div>
									<div>Price: ${car.price} per day</div>
								</div>
								<GoogleMap
									zoom={smallMapZoom}
									cars={this.state.cars}
									styles={smallMap}
									lat={parseFloat(car.lat)}
									lng={parseFloat(car.lng)}
								/>

								<button
									className="btn btn-reserve-car"
									onClick={this.handleMakeReservation}
									value={car.id}
								>
									Reserve This Car
								</button>
							</div>
						);
					}.bind(this)
				);
				this.setState({ carsToRender: carDivsToRender });
			}.bind(this)
		);
	}

	ampmHour(jsHour) {
		let AMPMHour;
		if (jsHour > 12) {
			AMPMHour = jsHour - 12;
		} else if (jsHour === 0) {
			AMPMHour = 12;
		}
		return AMPMHour;
	}

	jsHour(ampmHour, ampm) {
		let JSHour;
		if (ampm === "PM" && ampmHour !== 12) {
			JSHour = parseInt(ampmHour, 10) + 12;
		} else if (ampm === "AM" && ampmHour === 12) {
			JSHour = 0;
		} else if (ampm === "AM" || ampmHour === 12) {
			JSHour = parseInt(ampmHour, 10);
		}
		return JSHour;
	}

	updateStartHour(event) {
		let defaultEndTime =
			parseInt(this.jsHour(event.target.value, this.state.start_AMPM), 10) + 4;
		if (defaultEndTime >= 24) {
			defaultEndTime -= 24;
		}

		this.setState({
			start_hour: this.jsHour(event.target.value, this.state.start_AMPM),
			end_hour: defaultEndTime
		});
	}

	updateEndHour(event) {
		this.setState({
			end_hour: this.jsHour(event.target.value, this.state.end_AMPM)
		});
	}

	updateStartDay(event) {
		this.setState({
			start_day: event.target.value,
			end_day: event.target.value
		});
	}

	updateEndDay(event) {
		this.setState({ end_day: event.target.value });
	}

	updateStartMonth(event) {
		let jsStartMonth;
		if (event.target.value === "January") {
			jsStartMonth = 0;
		} else if (event.target.value === "February") {
			jsStartMonth = 1;
		} else if (event.target.value === "March") {
			jsStartMonth = 2;
		} else if (event.target.value === "April") {
			jsStartMonth = 3;
		} else if (event.target.value === "May") {
			jsStartMonth = 4;
		} else if (event.target.value === "June") {
			jsStartMonth = 5;
		} else if (event.target.value === "July") {
			jsStartMonth = 6;
		} else if (event.target.value === "August") {
			jsStartMonth = 7;
		} else if (event.target.value === "September") {
			jsStartMonth = 8;
		} else if (event.target.value === "October") {
			jsStartMonth = 9;
		} else if (event.target.value === "November") {
			jsStartMonth = 10;
		} else if (event.target.value === "December") {
			jsStartMonth = 11;
		}
		this.setState({ start_month: jsStartMonth, end_month: jsStartMonth });
	}

	updateEndMonth(event) {
		let jsEndMonth;
		if (event.target.value === "January") {
			jsEndMonth = 0;
		} else if (event.target.value === "February") {
			jsEndMonth = 1;
		} else if (event.target.value === "March") {
			jsEndMonth = 2;
		} else if (event.target.value === "April") {
			jsEndMonth = 3;
		} else if (event.target.value === "May") {
			jsEndMonth = 4;
		} else if (event.target.value === "June") {
			jsEndMonth = 5;
		} else if (event.target.value === "July") {
			jsEndMonth = 6;
		} else if (event.target.value === "August") {
			jsEndMonth = 7;
		} else if (event.target.value === "September") {
			jsEndMonth = 8;
		} else if (event.target.value === "October") {
			jsEndMonth = 9;
		} else if (event.target.value === "November") {
			jsEndMonth = 10;
		} else if (event.target.value === "December") {
			jsEndMonth = 11;
		}
		this.setState({ end_month: jsEndMonth });
	}

	updateStartYear(event) {
		this.setState({
			start_year: event.target.value,
			end_year: event.target.value
		});
	}

	updateEndYear(event) {
		this.setState({ end_year: event.target.value });
	}

	handleMakeReservation(event) {
		this.props.makeReservation({
			start_date: this.state.start_date,
			end_date: this.state.end_date,
			reservation_hours: this.state.reservation_hours,
			car_id: event.target.value
		});
	}

	updateStartAMPM(event) {
		this.setState({ start_AMPM: event.target.value });
	}

	updateEndAMPM(event) {
		this.setState({ end_AMPM: event.target.value });
	}
}

export default StartReservation;
