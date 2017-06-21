//build all select dropdowns
//finish logic to set correct start and end times

import React, { Component } from "react";

import times from "../times";
import weekDays from "../weekDays";
import monthDate28 from "../monthDate28";
import monthDate29 from "../monthDate29";
import monthDate30 from "../monthDate30";
import monthDate31 from "../monthDate31";
import months from "../months";
import ampm from "../ampm";

class StartReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start_time: "",
            start_AMPM: "",
            start_day: "",
            start_month: "",
            start_year: "",
            complete_start_date: "",
            end_day: "",
            end_month: "",
            end_year: "",
            complete_end_date: "",
            end_time: "",
            end_AMPM: "",
            car_id: props.car_id
        };
        this.updateCompleteStartDate = this.updateCompleteStartDate.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateStartAMPM = this.updateStartAMPM.bind(this);
        this.updateStartDay = this.updateStartDay.bind(this);
        this.updateStartMonth = this.updateStartMonth.bind(this);
        this.updateStartYear = this.updateStartYear.bind(this);
        this.updateEndDay = this.updateEndDay.bind(this);
        this.updateEndTime = this.updateEndTime.bind(this);
        this.updateEndAMPM = this.updateEndAMPM.bind(this);
        this.updateEndDay = this.updateEndDay.bind(this);
        this.updateEndMonth = this.updateEndMonth.bind(this);
        this.updateEndYear = this.updateEndYear.bind(this);
        this.makeReservation = this.makeReservation.bind(this);
        this.handleCloseReservation = this.handleCloseReservation.bind(this);
    }

    render() {
        console.log(this.state);
        let daysPerMonth;
        let timesList = times.map(function(time, index) {
            return <option key={index} value={time}>{time}</option>;
        });
        let ampmsList = ampm.map(function(ampm, index) {
            return <option key={index} value={ampm}>{ampm}</option>;
        });
        let monthList = months.map(function(month, index) {
            return <option key={index} value={month}>{month}</option>;
        });
        let dayList31 = monthDate31.map(function(day, index) {
            return <option key={index} value={day}>{day}</option>;
        });
        let dayList30 = monthDate30.map(function(day, index) {
            return <option key={index} value={day}>{day}</option>;
        });
        let dayList29 = monthDate29.map(function(day, index) {
            return <option key={index} value={day}>{day}</option>;
        });
        let dayList28 = monthDate28.map(function(day, index) {
            return <option key={index} value={day}>{day}</option>;
        });
        if (this.state.start_month % 2 === 1 && this.state.start_month !== 1) {
            daysPerMonth = dayList30;
        } else if (
            this.state.start_month === 1 &&
            this.state.start_year % 4 !== 0
        ) {
            daysPerMonth = dayList28;
        } else if (
            this.state.start_month === 1 &&
            this.state.start_year % 4 === 0
        ) {
            daysPerMonth = dayList29;
        } else {
            daysPerMonth = dayList31;
        }

        console.log(daysPerMonth);
        return (
            <div>
                From
                <select
                    onChange={this.updateStartTime}
                    value={this.state.start_time}
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
                <select
                    onChange={this.updateStartMonth}
                    value={this.state.start_month}
                >
                    {monthList}
                </select>
                <select
                    onChange={this.updateStartDay}
                    value={this.state.start_day}
                >
                    {daysPerMonth}
                </select>

                <br />
                Until
                <select
                    onChange={this.updateEndTime}
                    value={this.state.end_time}
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
                <select
                    onChange={this.updateEndMonth}
                    value={this.state.end_month}
                >
                    {monthList}
                </select>
                <select onChange={this.updateEndDay} value={this.state.end_day}>
                    {daysPerMonth}
                </select>
                <button onClick={this.makeReservation}>
                    Make Reservation
                </button>
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
            start_time: today.getHours(),
            start_day: today.getDate(),
            start_month: today.getMonth(),
            start_year: today.getYear(),
            end_time: today.getHours(),
            end_day: today.getDate(),
            end_month: today.getMonth(),
            end_year: today.getYear()
        });
    }
    updateStartTime() {}
    updateEndTime() {}
    updateStartDay(event) {
        this.setState({ start_day: event.target.value });
    }
    updateEndDay(event) {
        this.setState({ end_day: event.target.value });
    }
    updateStartMonth(event) {
        let jsMonth;
        if (event.target.value === "January") {
            jsMonth = 0;
        } else if (event.target.value === "February") {
            jsMonth = 1;
        } else if (event.target.value === "March") {
            jsMonth = 2;
        } else if (event.target.value === "April") {
            jsMonth = 3;
        } else if (event.target.value === "May") {
            jsMonth = 4;
        } else if (event.target.value === "June") {
            jsMonth = 5;
        } else if (event.target.value === "July") {
            jsMonth = 6;
        } else if (event.target.value === "August") {
            jsMonth = 7;
        } else if (event.target.value === "September") {
            jsMonth = 8;
        } else if (event.target.value === "October") {
            jsMonth = 9;
        } else if (event.target.value === "November") {
            jsMonth = 10;
        } else if (event.target.value === "December") {
            jsMonth = 11;
        }
        this.setState({ start_month: jsMonth });
    }
    updateEndMonth(event) {
        let jsMonth;
        if (event.target.value === "January") {
            jsMonth = 0;
        } else if (event.target.value === "February") {
            jsMonth = 1;
        } else if (event.target.value === "March") {
            jsMonth = 2;
        } else if (event.target.value === "April") {
            jsMonth = 3;
        } else if (event.target.value === "May") {
            jsMonth = 4;
        } else if (event.target.value === "June") {
            jsMonth = 5;
        } else if (event.target.value === "July") {
            jsMonth = 6;
        } else if (event.target.value === "August") {
            jsMonth = 7;
        } else if (event.target.value === "September") {
            jsMonth = 8;
        } else if (event.target.value === "October") {
            jsMonth = 9;
        } else if (event.target.value === "November") {
            jsMonth = 10;
        } else if (event.target.value === "December") {
            jsMonth = 11;
        }
        this.setState({ end_month: jsMonth });
    }
    updateStartYear() {}
    updateEndYear() {}
    updateCompleteStartDate() {}
    updateCompleteEndDate() {}
    handleCloseReservation() {
        this.props.closeReservation();
    }
    updateCompleteStartDate(event) {
        console.log(event);
        //trying to get into the weekdays object to pull out name of weekday instead of JS day number
        // var weekDay = weekDays.this.state.start_day;
        this.setState({
            start_date: new Date(
                this.state.start_year,
                this.state.start_month,
                this.state.start_day,
                this.state.start_time
            )
        });
    }
    makeReservation() {
        this.props.makeReservation(this.state);
    }
    updateStartTime(event) {
        this.setState({ start_time: event.target.value });
    }
    updateStartAMPM(event) {
        this.setState({ start_AMPM: event.target.value });
    }
    updateEndAMPM(event) {
        this.setState({ end_AMPM: event.target.value });
    }
    updateEndTime(event) {
        this.setState({ end_time: event.target.value });
    }
}

export default StartReservation;
