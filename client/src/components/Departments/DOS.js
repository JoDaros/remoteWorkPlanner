import React, { useState } from "react";
import GroupInput from "../Group/GroupInput";
import RemoteCalendar from "../Calendar/RemoteCalendar";
import { getFirstDayOfMonthFormatted } from "../../Utils/DateUtils";
import { requestRemoteDays } from "../../Utils/Request";

const DOS = (props) => {
  const [remoteDays, setRemoteDays] = useState([]);
  const [group, setGroup] = useState();
  const [selectedDate, setSelectedDate] = useState(
    getFirstDayOfMonthFormatted(Date.now())
  );
  const [requestedMonths, setRequestedMonths] = useState([]);

  const requestRemoteDaysFromServer = async (
    requestedMonths,
    requestDate,
    requestGroup
  ) => {
    try {
      const previousRequestMonth = requestedMonths.find(
        (month) => requestDate === month
      );

      if (!previousRequestMonth) {
        const newRemoteDays = await requestRemoteDays(
          requestDate,
          requestGroup
        );
        setRemoteDays((prevRemoteDays) => {
          return prevRemoteDays.concat([...newRemoteDays]);
        });
        setRequestedMonths((prevRequestMonths) => {
          return prevRequestMonths.concat(requestDate);
        });
      }
    } catch (error) {
      console.log(error);
      props.onError("An error occurred while connecting to the server");
    }

    props.onLoading(false);
  };

  const selectGroupHandler = async (selectedGroup) => {
    const newRequestedMonths = [];

    if (group === selectedGroup) {
      return;
    }

    setRequestedMonths(newRequestedMonths);
    setRemoteDays([]);
    setGroup(selectedGroup);
    props.onLoading(true);
    props.onError(undefined);

    await requestRemoteDaysFromServer(
      newRequestedMonths,
      selectedDate,
      selectedGroup
    );
  };

  const selectedDateHandler = async (selectedDate) => {
    const newDate = getFirstDayOfMonthFormatted(selectedDate);
    setSelectedDate(newDate);
    if (group) {
      await requestRemoteDaysFromServer(requestedMonths, newDate, group);
    }
  };

  return (
    <React.Fragment>
      <GroupInput onGroupSelected={selectGroupHandler} />
      <RemoteCalendar
        remoteDays={remoteDays}
        onChangeSelectedDate={selectedDateHandler}
      />
    </React.Fragment>
  );
};

export default DOS;
