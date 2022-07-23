import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  daySelected: null,
  setDaySelected: (day) => {},
  dispatchCalEvent: ({ type, payload }) => {},
  events: [],
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  allEvents: [],
  monthId: 1,
  setMonthId: (index) => {},
});

export default GlobalContext;
