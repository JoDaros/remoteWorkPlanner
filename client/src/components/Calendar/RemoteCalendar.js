import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./RemoteCalendar.css";

const RemoteCalendar = (props) => {

  const setClass = (date) => {
    const dateobj =
      props.remoteDays &&
      props.remoteDays.find((x) => {
        return (
          date.getDay() === new Date(x).getDay() &&
          date.getMonth() === new Date(x).getMonth() &&
          date.getDate() === new Date(x).getDate()
        );
      });
    return dateobj ? "highlight" : "";
  };

  return (
    <div className="mt-2 col-xs-8 d-flex justify-content-center">
      <Calendar
        onActiveStartDateChange={props.updateDays}
        tileClassName={({ activeStartDate, date, view }) => setClass(date)}
        minDate={new Date("2021-10-01")}
      />
    </div>
  );
};

export default RemoteCalendar;
