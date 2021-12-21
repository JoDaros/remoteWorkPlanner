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

  const onNextOrPrevious = ({ activeStartDate, action, view }) => {
    if (view === "month" && (action === "next" || action === "prev")) {
      props.onChangeSelectedDate(activeStartDate)
    }
  };
  const onSelectedMonth = (activeStartDate) => {
    props.onChangeSelectedDate(activeStartDate)
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDay();
  const maxDate = new Date(currentYear+2, currentMonth, currentDay);

  return (
    <div className="mt-2 col-xs-8 d-flex justify-content-center">
      <Calendar
        onActiveStartDateChange={onNextOrPrevious}
        onClickMonth={onSelectedMonth}
        tileClassName={({date}) => setClass(date)}
        minDate={new Date("2021-10-01")}
        maxDate={maxDate}
      />
    </div>
  );
};

export default RemoteCalendar;
