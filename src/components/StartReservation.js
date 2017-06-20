import React, { Component } from "react";
import axios from "axios";

import times from "../times";
import weekDays from "../weekDays";
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
            start_date: "",
            end_day: "",
            end_month: "",
            end_year: "",
            end_date: "",
            end_time: "",
            end_AMPM: "",
            car_id: props.car_id
        };
        this.updateStart_Date = this.updateStart_Date.bind(this);
        this.updateStart_Time = this.updateStart_Time.bind(this);
        this.updateEnd_Time = this.updateEnd_Time.bind(this);
        this.updateStart_AMPM = this.updateStart_AMPM.bind(this);
        this.updateEnd_AMPM = this.updateEnd_AMPM.bind(this);
        this.makeReservation = this.makeReservation.bind(this);
        this.handleCloseReservation = this.handleCloseReservation.bind(this);
    }

    render() {
        console.log(this.state);
        let timesList = times.map(function(time, index) {
            return <option key={index} value={time}>{time}</option>;
        });
        let ampmsList = ampm.map(function(ampm, index) {
            return <option key={index} value={ampm}>{ampm}</option>;
        });

        return (
            <div>
                From
                <select
                    onChange={this.updateStart_Time}
                    value={this.state.start_time}
                    placeholder="Start Time"
                >
                    {timesList}
                </select>
                <select
                    onChange={this.updateStart_AMPM}
                    value={this.state.start_AMPM}
                >
                    {ampmsList}
                </select>

                <br />
                Until
                <select
                    onChange={this.updateEnd_Time}
                    value={this.state.end_time}
                    placeholder="End Time"
                >
                    {timesList}
                </select>
                <select
                    onChange={this.updateEnd_AMPM}
                    value={this.state.End_AMPM}
                >
                    {ampmsList}
                </select>
                <button onClick={this.makeReservation}>Make Reservation</button>
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
            start_day: today.getDay(),
            start_month: today.getMonth(),
            start_year: 1900 + today.getYear(),
            end_time: today.getHours(),
            end_day: today.getDay(),
            end_month: today.getMonth(),
            end_year: 1900 + today.getYear()
        });
    }
    handleCloseReservation() {
        this.props.closeReservation();
    }
    updateStart_Date(event) {
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
    updateStart_Time(event) {
        this.setState({ start_time: event.target.value });
    }
    updateStart_AMPM(event) {
        this.setState({ start_AMPM: event.target.value });
    }
    updateEnd_AMPM(event) {
        this.setState({ end_AMPM: event.target.value });
    }
    updateEnd_Time(event) {
        this.setState({ end_time: event.target.value });
    }
}

export default StartReservation;
