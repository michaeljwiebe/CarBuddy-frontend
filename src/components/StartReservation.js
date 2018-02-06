//This component features my very own date time picker.
//I used js files listing the potential number of days that a month could have as well as the months and years that I wanted to have available to pick.
//I mapped those files into option tags so that I could put them into a a select tag on the frontend
//I then wrote logic to use the correct number of days depending on which month (and year to account for leap years) was selected
//I then built selectors for hour, AM/PM, month, day of the month, and year for both start start and finish of reservations.
//To prevent double-booking I built new Date objects with the data that was selected and converted them into milliseconds so that I could easily determine if the requested reservation times overlapped with any other reservation that was already in the database. This gave me a list of car IDs that the user making the current reservation should not be available to choose.
//I then display the cars that were not listed in the above array as options to reserve.

import React, { Component } from "react";
import { connect } from 'react-redux';
import GoogleMap from "./GoogleMap";
import _ from 'lodash';

import "../css/StartReservation.css";

import times from "../times";
import ampm from "../ampm";
import monthDate28 from "../monthDate28";
import monthDate29 from "../monthDate29";
import monthDate30 from "../monthDate30";
import monthDate31 from "../monthDate31";
import months from "../months";
import years from "../years";

import { 
	startAmpmChanged, 
	startHourChanged, 
	startDayChanged, 
	startMonthChanged, 
	startYearChanged,
	endAmpmChanged, 
	endHourChanged, 
	endDayChanged, 
	endMonthChanged, 
	endYearChanged 
}from '../actions';

class StartReservation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// start_date: null,
			// end_date: null,
			reservation_hours: "",
			inputs: props.inputs,
			carToReserve: null,
			reservations: props.reservations,
			cars: props.cars,
			carsToRender: [],
			availableCars: 0
		};
		// this.updateStartHour = this.updateStartHour.bind(this);
		// this.ampmHour = this.ampmHour.bind(this);
		// this.jsHour = this.jsHour.bind(this);
		// this.updateStartAMPM = this.updateStartAMPM.bind(this);
		// this.updateStartDay = this.updateStartDay.bind(this);
		// this.updateStartMonth = this.updateStartMonth.bind(this);
		// this.updateStartYear = this.updateStartYear.bind(this);
		// this.updateEndDay = this.updateEndDay.bind(this);
		// this.updateEndHour = this.updateEndHour.bind(this);
		// this.updateEndAMPM = this.updateEndAMPM.bind(this);
		// this.updateEndDay = this.updateEndDay.bind(this);
		// this.updateEndMonth = this.updateEndMonth.bind(this);
		// this.updateEndYear = this.updateEndYear.bind(this);
		// this.handleMakeReservation = this.handleMakeReservation.bind(this);
		this.viewAvailableCars = this.viewAvailableCars.bind(this);
	}

	//there is way too much code in this return. factor that out.
	render() {
		const { 
			startAmpm, 
			endAmpm, 
			startHour, 
			startDay, 
			startMonth, 
			startYear, 
			startDate, 
			endHour, 
			endDay, 
			endMonth, 
			endYear,
			endDate 
		} = this.props;

		//LISTS OF OPTIONS FOR HOUR, DAY, MONTH, YEAR
		const timesList = times.map(function(time, index) {
			return <option key={index} value={time}>{time}</option>;
		});
		const ampmsList = ampm.map(function(ampm, index) {
			return <option key={index} value={ampm}>{ampm}</option>;
		});
		const monthList = months.map(function(month, index) {
			return <option key={index} value={month}>{month}</option>;
		});
		const daysList31 = monthDate31.map(function(day, index) {
			return <option key={index} value={day}>{day}</option>;
		});
		const daysList30 = monthDate30.map(function(day, index) {
			return <option key={index} value={day}>{day}</option>;
		});
		const daysList29 = monthDate29.map(function(day, index) {
			return <option key={index} value={day}>{day}</option>;
		});
		const daysList28 = monthDate28.map(function(day, index) {
			return <option key={index} value={day}>{day}</option>;
		});
		const yearsList = years.map(function(year, index) {
			return <option key={index} value={year}>{year}</option>;
		});
		const viewAvailableCarsBtn = (
			<div onClick={this.viewAvailableCars} className="btn btn-view-cars">
				View Cars
			</div>
		);


		//determines how many days should be displayed in the dropdown depending on month selected
		let daysPerMonthList;
		let month30days = ["April", "June", "September", "November"];
		function selectDays(month) {
			if (month30days.indexOf(month) !== -1 )  {
				daysPerMonthList = daysList30;
			} else if (month === "February" && (startYear % 4 !== 0 || endYear % 4 !== 0) ) {
				daysPerMonthList = daysList28;
			} else if (month === "February" && (startYear % 4 === 0 || endYear % 4 === 0) ) {
				daysPerMonthList = daysList29;
			} else {
				daysPerMonthList = daysList31;
			}
			return daysPerMonthList;
		}

		let datesInput;
		let availableCars;
		if (this.state.inputs === false){
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


		const { 
			startAmpmChanged, 
			startHourChanged, 
			startDayChanged, 
			startMonthChanged, 
			startYearChanged, 
			endAmpmChanged, 
			endHourChanged,  
			endDayChanged, 
			endMonthChanged, 
			endYearChanged } = this.props;

		if (this.state.inputs === true) {
			datesInput = (
				<div className="flex reservation-inputs-container">
					<div className="reservation-start-inputs">
						<span className="reservation-labels">From</span>
						<br />
						<select
							className="input input-select input-reservation-3em"
							onChange={(event) => startHourChanged(event.target.value)}
						>
							{timesList}
						</select>
						<select
							className="input input-select input-reservation-3em"
							onChange={(event) => startAmpmChanged(event.target.value)}
						>
							{ampmsList}
						</select>
						<select
							className="input input-select input-reservation-3em"
							onChange={(event) => startDayChanged(event.target.value)}
						>
							{selectDays(startMonth)}
						</select>
						<select
							className="input input-select input-reservation-month"
							onChange={(event) => startMonthChanged(event.target.value)}
							value={startMonth}
						>
							{monthList}
						</select>
						<select
							className="input input-select input-reservation-year"
							onChange={(event) => startYearChanged(event.target.value)}
						>
							{yearsList}
						</select>
					</div>
					<div className="reservation-end-inputs">
						<span className="reservation-labels">Until</span>

						<br />
						<select
							className="input input-select input-reservation-3em"
							onChange={(event) => endHourChanged(event.target.value)}
						>
							{timesList}
						</select>
						<select
							className="input input-select input-reservation-3em"
							onChange={(event) => endAmpmChanged(event.target.value)}
						>
							{ampmsList}
						</select>
						<select
							className="input input-select input-reservation-3em"
							onChange={(event) => endDayChanged(event.target.value)}
						>
							{selectDays(endMonth)}
						</select>
						<select
							onChange={(event) => endMonthChanged(event.target.value)}
							className="input input-select input-reservation-month"
							value={endMonth}
						>
							{monthList}
						</select>
						<select
							onChange={(event) => endYearChanged(event.target.value)}
							className="input input-select input-reservation-year"
						>
							{yearsList}
						</select>
					</div>
					<br />
					{viewAvailableCarsBtn}
				</div>
			);
		}
		/*
		*		------------------------------------ MAIN RETURN 
		*/
		return (
			<div>
				{datesInput}
				{availableCars}
			</div>
		);
	}

	viewAvailableCars() {
		let{
			startHour,
			endHour
		} = this.props;
		const { 
			endAmpm, 
			startAmpm,
			startDay,
	    startMonth,
			startYear,
	  	endDay,
			endMonth,
			endYear } = this.props;
		if (startAmpm === "PM"){
			startHour = parseInt(startHour) + 12;
			startHour.toString();
		}
		if (endAmpm === "PM"){
			endHour = parseInt(endHour) + 12;
			endHour.toString();
		}
		var startDate = new Date(`${startMonth} ${startDay}, ${startYear} ${startHour}:00:00`);
		var endDate = new Date(`${endMonth} ${endDay}, ${endYear} ${endHour}:00:00`);

		let unAvailableCars;
		let conflictingReservations;
		let carsToRender;
		let carDivsToRender;

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
		// this.setState(
		// 	{
		// 		reservation_hours: elapsedHours,
		// 		start_date: startDate,
		// 		end_date: endDate,
		// 		inputs: false
		// 	},
		(function() {
			const { reservations, cars } = this.props;
			console.log('cars', cars);
			conflictingReservations = reservations.filter(
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
			carsToRender = cars.filter(function(car) {
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
		}.bind(this))();

	}



// 	handleMakeReservation(event) {
// 		this.props.makeReservation({
// 			start_date: this.state.start_date,
// 			end_date: this.state.end_date,
// 			reservation_hours: this.state.reservation_hours,
// 			car_id: event.target.value
// 		});
// 	}

}

const mapStateToProps = ( state ) => {

  const reservations = _.map(state.reservations, (val, uid) => {
    return { ...val, uid };
  });
  const cars = _.map(state.cars, (val, uid) => {
    return { ...val, uid };
  });


	const { 
		startAmpm, 
		startHour,
		startDay,
    startMonth,
		startYear,
		startDate,
		endAmpm, 
		endHour,
  	endDay,
		endMonth,
		endYear,
		endDate
	} = state.reservationForm;

	return {
		startAmpm, 
		startHour,
		startDay,
    startMonth,
		startYear,
		startDate,
		endAmpm, 
		endHour,
  	endDay,
		endMonth,
		endYear, 
		endDate,
		reservations,
		cars
	};
};

export default connect(mapStateToProps, { 
	startAmpmChanged, 
	startHourChanged, 
	startDayChanged, 
	startMonthChanged, 
	startYearChanged,
	endAmpmChanged, 
	endHourChanged, 
	endDayChanged, 
	endMonthChanged, 
	endYearChanged 
})(StartReservation);
