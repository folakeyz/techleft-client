import React, { useState, useContext, useEffect } from "react";
import {
  Header,
  Navigation,
  MenuBar,
  // Toggle,
} from "../../components";
import { CalendarHeader, CalendarAllMonth } from "../../components";
import { getMonth } from "../../components/utils";
import styles from "./styles.module.css";
import GlobalContext from "../../context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { getMyCompany } from "../../redux/actions/companyActions";
import { useParams } from "react-router-dom";
import { fetchEmployee } from "../../redux/actions/employeeActions";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";

import { fetchSchedule } from "../../redux/actions/scheduleActions";
import moment from "moment";
import { fetchAllEvent } from "../../redux/actions/eventActions";

// convert Time to 24hrs
const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

const AllAssistant = () => {
  const dispatch = useDispatch();
  const { id, index } = useParams();

  const getEvent = useSelector((state) => state.getEvent);
  const { loading: gLoading, error: gError } = getEvent;

  // const getAllEvent = useSelector((state) => state.getAllEvent);
  // const { events } = getAllEvent;

  const monthNumber = index;
  const {
    // monthIndex,
    daySelected,
    setShowEventModal,
    showEventModal,
    selectedEvent,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [eventID, setEventID] = useState(null);
  const [employee, setEmployee] = useState("");
  const [startTime, setStartTime] = useState(
    selectedEvent ? selectedEvent.start_time : ""
  );
  const [endTime, setEndTime] = useState(
    selectedEvent ? selectedEvent.end_time : ""
  );
  const [note, setNote] = useState(selectedEvent ? selectedEvent.note : "");
  useEffect(() => {
    setCurrentMonth(getMonth(parseInt(monthNumber)));
    if (selectedEvent) {
      setEventID(selectedEvent.id);
      setEmployee(selectedEvent.employee.id);
      setStartTime(convertTime12to24(selectedEvent.start_time));
      setEndTime(convertTime12to24(selectedEvent.end_time));
      setNote(selectedEvent.note);
    }
  }, [monthNumber, selectedEvent]);

  useEffect(() => {
    dispatch(fetchAllEvent(id));
    dispatch(getMyCompany());
    dispatch(fetchEmployee());
    dispatch(fetchSchedule());

    // dispatch(deleteEvent(id));
  }, [dispatch, id]);

  // Menubar Items
  const menu = [
    { name: "Month Setup", url: "/app/rota" },
    { name: "Manage Schedule", active: true, url: "/app/schedule" },
    { name: "Time Sheet", url: "/app/reports" },
  ];

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle={`All Schedule`} />
        <div className={styles.calendar}>
          <MenuBar menu={menu} />
          <CalendarHeader monthNumber={monthNumber} />
          <div className={styles.monthContainer}>
            {/* SideBar */}
            {/* Month */}

            <CalendarAllMonth month={currentMonth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAssistant;
