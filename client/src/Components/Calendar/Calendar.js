import React, { Component } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
class CalendarComponent extends Component {
    setClass = (date) => {
        const dateobj =
            this.props.remoteDays &&
            this.props.remoteDays.find((x) => {
                return (
                    date.getDay() === new Date(x).getDay() &&
                    date.getMonth() === new Date(x).getMonth() &&
                    date.getDate() === new Date(x).getDate()
                );
            });
        return dateobj ? "highlight" : ""
    };
    render() {
        return (
            <Calendar
                //onChange={onChange}
                onActiveStartDateChange={this.props.updateDays}
                tileClassName={({ activeStartDate, date, view }) => this.setClass(date)}
                minDate={new Date("2021-10-01")}
            />
        );
    }
}

export default CalendarComponent;
