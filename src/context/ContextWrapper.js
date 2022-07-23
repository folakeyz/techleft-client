import dayjs from "dayjs";
import React, { useEffect, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvent, fetchEvent } from "../redux/actions/eventActions";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

const ContextWrapper = (props) => {
  const dispatch = useDispatch();
  const getEvent = useSelector((state) => state.getEvent);
  const { events } = getEvent;
  const getAllEvent = useSelector((state) => state.getAllEvent);
  const { events: allEvents } = getAllEvent;
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [monthId, setMonthId] = useState(1);

  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchEvent());
      dispatch(fetchAllEvent(monthId));
    }
  }, [dispatch, userInfo, monthId]);
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        events,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        allEvents,
        monthId,
        setMonthId,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
