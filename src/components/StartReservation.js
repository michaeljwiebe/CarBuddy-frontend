import React, { Component } from "react";

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
            car_id: props.car_id
        };
        this.setDates = this.setDates.bind(this);
        this.updateStartHours = this.updateStartHours.bind(this);
        this.updateStartAMPM = this.updateStartAMPM.bind(this);
        this.updateStartDay = this.updateStartDay.bind(this);
        this.updateStartMonth = this.updateStartMonth.bind(this);
        this.updateStartYear = this.updateStartYear.bind(this);
        this.updateEndDay = this.updateEndDay.bind(this);
        this.updateEndHours = this.updateEndHours.bind(this);
        this.updateEndAMPM = this.updateEndAMPM.bind(this);
        this.updateEndDay = this.updateEndDay.bind(this);
        this.updateEndMonth = this.updateEndMonth.bind(this);
        this.updateEndYear = this.updateEndYear.bind(this);
        this.makeReservation = this.makeReservation.bind(this);
        this.handleCloseReservation = this.handleCloseReservation.bind(this);
    }

    render() {
        console.log(this.state);
        let daysPerMonthList;
        let textStartMonth;
        let textEndMonth;
        let setDatesOrMakeReservation;
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
        if (this.state.start_month % 2 === 1 && this.state.start_month !== 1) {
            daysPerMonthList = daysList30;
        } else if (
            this.state.start_month === 1 &&
            this.state.start_year % 4 !== 0
        ) {
            daysPerMonthList = daysList28;
        } else if (
            this.state.start_month === 1 &&
            this.state.start_year % 4 === 0
        ) {
            daysPerMonthList = daysList29;
        } else {
            daysPerMonthList = daysList31;
        }
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
        if (this.state.start_date === null) {
            setDatesOrMakeReservation = (
                <button onClick={this.setDates}>Set Dates</button>
            );
        } else {
            setDatesOrMakeReservation = (
                <button onClick={this.makeReservation}>
                    Make Reservation
                </button>
            );
        }
        return (
            <div>
                From
                <select
                    onChange={this.updateStartHours}
                    value={this.state.start_hour}
                    placeholder="Start Time"
                >
                    {timesList}
                </select>
                <select
                    onChange={this.updateStartAMPM}
                    value={this.state.start_AMPM}
                >
                    {ampmsList}
                </select>
                <select onChange={this.updateStartMonth} value={textStartMonth}>
                    {monthList}
                </select>
                <select
                    onChange={this.updateStartDay}
                    value={this.state.start_day}
                >
                    {daysPerMonthList}
                </select>
                <select
                    onChange={this.updateStartYear}
                    value={this.state.start_year}
                >
                    {yearsList}
                </select>
                <br />
                Until
                <select
                    onChange={this.updateEndHours}
                    value={this.state.end_hour}
                    placeholder="End Time"
                >
                    {timesList}
                </select>
                <select
                    onChange={this.updateEndAMPM}
                    value={this.state.end_AMPM}
                >
                    {ampmsList}
                </select>
                <select onChange={this.updateEndMonth} value={textEndMonth}>
                    {monthList}
                </select>
                <select onChange={this.updateEndDay} value={this.state.end_day}>
                    {daysPerMonthList}
                </select>
                <select
                    onChange={this.updateEndYear}
                    value={this.state.end_year}
                >
                    {yearsList}
                </select>
                <br />
                {setDatesOrMakeReservation}
                <button onClick={this.handleCloseReservation}>
                    Close Reservation
                </button>
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
    updateStartHours(event) {
        this.setState({
            start_hour: event.target.value,
            end_hour: event.target.value
        });
    }
    updateEndHours(event) {
        this.setState({ end_hour: event.target.value });
    }
    updateStartDay(event) {
        this.setState({ start_day: event.target.value });
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
    setDates() {
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
        this.setState({
            reservation_hours: elapsedHours,
            start_date: startDate,
            end_date: endDate
        });
    }
    handleCloseReservation() {
        this.props.closeReservation();
    }

    makeReservation() {
        this.props.makeReservation(this.state);
    }
    updateStartAMPM(event) {
        this.setState({ start_AMPM: event.target.value });
    }
    updateEndAMPM(event) {
        this.setState({ end_AMPM: event.target.value });
    }
}

export default StartReservation;
