import React, { useState, useContext, useEffect } from "react";
import {
  Header,
  Navigation,
  Modal,
  Button,
  Select,
  Textarea,
  MenuBar,
  // Toggle,
  Input,
} from "../../components";
import { CalendarHeader, CalendarMonth } from "../../components";
import { getMonth } from "../../components/utils";
import styles from "./styles.module.css";
import GlobalContext from "../../context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { getMyCompany } from "../../redux/actions/companyActions";
import { useParams } from "react-router-dom";
import { fetchEmployee } from "../../redux/actions/employeeActions";
import { fetchSingleClient } from "../../redux/actions/clientActions";
import {
  createEvent,
  deleteEvent,
  // deleteEvent,
  fetchEvent,
  patchEvent,
  publish,
} from "../../redux/actions/eventActions";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import {
  CREATE_EVENT_RESET,
  DELETE_EVENT_RESET,
  GET_EVENT_RESET,
  PUBLISH_EVENT_RESET,
  UPDATE_EVENT_RESET,
} from "../../redux/constants/eventConstants";
import { fetchSchedule } from "../../redux/actions/scheduleActions";
import dayjs from "dayjs";
import { FaTelegramPlane } from "react-icons/fa";
import swal from "sweetalert";

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

function convertTo12Hrs(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}
console.log(convertTime12to24("24:00"));
console.log(convertTime12to24("12:00 PM"));
const Assistant = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { id, scheduleId } = useParams();
  const client = id;

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany = [] } = getCompany;
  const company = myCompany[0] ? myCompany[0].id : "";

  const getEmployee = useSelector((state) => state.getEmployee);
  const { employees: allEmp = [] } = getEmployee;

  const singleClient = useSelector((state) => state.singleClient);
  const { client: office } = singleClient;

  const emp = office ? office.employees : [];

  const addEvent = useSelector((state) => state.addEvent);
  const { loading, error, success } = addEvent;

  const getEvent = useSelector((state) => state.getEvent);
  const { loading: gLoading, error: gError } = getEvent;

  const updateEvent = useSelector((state) => state.updateEvent);
  const { loading: uLoading, error: uError, success: uSuccess } = updateEvent;

  const removeEvent = useSelector((state) => state.removeEvent);
  const { loading: rLoading, error: rError, success: rSuccess } = removeEvent;

  const publishEvent = useSelector((state) => state.publishEvent);
  const { loading: pLoading, error: pError, success: pSuccess } = publishEvent;

  const getSchedule = useSelector((state) => state.getSchedule);
  const { schedules = [] } = getSchedule;
  const schID = schedules.find((x) => x.id === parseInt(scheduleId));
  const monthNumber = schID ? schID.month.index : 0;
  const {
    // monthIndex,
    daySelected,
    setShowEventModal,
    showEventModal,
    selectedEvent,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const [dub, setDub] = useState(false);
  const [days, setDays] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [eventID, setEventID] = useState(null);
  const [employee, setEmployee] = useState("");
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:00");
  const [note, setNote] = useState(selectedEvent ? selectedEvent.note : "");

  const [startTimes, setStartTimes] = useState("");
  const [endTimes, setEndTimes] = useState("");
  // const [status, setStatus] = useState("Pending");
  let status = "Pending";
  useEffect(() => {
    setCurrentMonth(getMonth(parseInt(monthNumber)));
    if (selectedEvent) {
      let newStart;
      let newEnd;
      const start = convertTime12to24(selectedEvent.start_time);
      const end = convertTime12to24(selectedEvent.end_time);
      if (start.length < 5) {
        newStart = 0 + start;
      } else {
        newStart = start;
      }
      if (end.length < 5) {
        newEnd = 0 + end;
      } else {
        newEnd = end;
      }
      setEventID(selectedEvent.id);
      setEmployee(selectedEvent.employee.id);
      setStartTime(newStart);
      setStartTimes(selectedEvent.start_time);
      setEndTime(newEnd);
      setEndTimes(selectedEvent.end_time);
      setNote(selectedEvent.note);
    }
  }, [monthNumber, selectedEvent]);

  const startTimeHandler = (e) => {
    // var timeSplit = e.split(":"),
    //   hours,
    //   minutes,
    //   meridian;
    // hours = timeSplit[0];
    // minutes = timeSplit[1];
    // if (hours > 12) {
    //   meridian = "PM";
    //   hours -= 12;
    // } else if (hours < 12) {
    //   meridian = "AM";
    //   if (hours === 0) {
    //     hours = 12;
    //   }
    // } else {
    //   meridian = "PM";
    // }
    setStartTimes(convertTo12Hrs(e.target.value));
    setStartTime(e.target.value);
  };
  const endTimeHandler = (e) => {
    // var timeSplit = e.format(format).split(":"),
    //   hours,
    //   minutes,
    //   meridian;
    // hours = timeSplit[0];
    // minutes = timeSplit[1];
    // if (hours > 12) {
    //   meridian = "PM";
    //   hours -= 12;
    // } else if (hours < 12) {
    //   meridian = "AM";
    //   if (hours === 0) {
    //     hours = 12;
    //   }
    // } else {
    //   meridian = "PM";
    // }
    setEndTimes(convertTo12Hrs(e.target.value));
    setEndTime(e.target.value);
  };

  // console.log(daySelected.valueOf());
  // console.log(dayjs(daySelected).add(1, "day").valueOf());

  function handleSubmit(e) {
    e.preventDefault();

    var date1 = new Date(
      parseInt(daySelected.format("YYYY-MM-DD")),
      parseInt(convertTime12to24(startTimes))
    ); // 9:00 AM
    var date2 = new Date(
      parseInt(daySelected.format("YYYY-MM-DD")),
      parseInt(convertTime12to24(endTimes))
    ); // 5:00 PM

    // the following is to handle cases where the times are on the opposite side of
    // midnight e.g. when you want to get the difference between 9:00 PM and 5:00 AM
    let date = daySelected.valueOf();
    const name = "Shift";
    let start_time = startTimes;
    let end_time = endTimes;
    if (date2 < date1) {
      end_time = "11:59 PM";
      dispatch(
        createEvent(
          company,
          employee,
          client,
          name,
          start_time,
          end_time,
          note,
          status,
          date
        )
      );
      start_time = "12:00 AM";
      end_time = endTimes;
      date = dayjs(daySelected).add(1, "day").valueOf();
      dispatch(
        createEvent(
          company,
          employee,
          client,
          name,
          start_time,
          end_time,
          note,
          status,
          date
        )
      );
    } else {
      dispatch(
        createEvent(
          company,
          employee,
          client,
          name,
          start_time,
          end_time,
          note,
          status,
          date
        )
      );
    }
  }

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_EVENT_RESET });
  }
  if (gError) {
    toast({
      title: "Error",
      description: gError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: GET_EVENT_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Event added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setShowEventModal(false);
    dispatch(fetchEvent());
    setSelectedEvent(null);
    setShowEventModal(false);
    setDub(false);
    setEmployee("");
    setStartTime("");
    setEndTime("");
    setNote("");
    setDub(false);
    setDays(0);
    dispatch({ type: CREATE_EVENT_RESET });
  }

  if (uError) {
    toast({
      title: "Error",
      description: uError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: UPDATE_EVENT_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Event updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setShowEventModal(false);
    dispatch(fetchEvent());
    dispatch({ type: UPDATE_EVENT_RESET });
  }

  if (pError) {
    toast({
      title: "Error",
      description: pError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: PUBLISH_EVENT_RESET });
  }
  if (pSuccess) {
    toast({
      title: "Notification",
      description: "Event published Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: PUBLISH_EVENT_RESET });
  }

  if (rError) {
    toast({
      title: "Error",
      description: rError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });

    dispatch({ type: DELETE_EVENT_RESET });
  }
  if (rSuccess) {
    toast({
      title: "Notification",
      description: "Event deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(fetchEvent());
    setSelectedEvent(null);
    setShowEventModal(false);
    setDub(false);
    setEmployee("");
    setStartTime("");
    setEndTime("");
    setNote("");
    setDub(false);
    setDays(0);
    dispatch({ type: DELETE_EVENT_RESET });
  }

  useEffect(() => {
    dispatch(fetchSingleClient(id));
    dispatch(getMyCompany());
    dispatch(fetchEmployee());
    dispatch(fetchSchedule());
    setStartTime("");
    setEndTime("");
    // dispatch(deleteEvent(id));
  }, [dispatch, id]);

  const closeHandler = () => {
    setSelectedEvent(null);
    setShowEventModal(false);
    setDub(false);
    setEmployee("");
    setStartTime("");
    setEndTime("");
    setNote("");
    setDub(false);
    setDays(0);
  };

  const updateHandler = () => {
    var date1 = new Date(
      parseInt(daySelected.format("YYYY-MM-DD")),
      parseInt(convertTime12to24(startTimes))
    ); // 9:00 AM
    var date2 = new Date(
      parseInt(daySelected.format("YYYY-MM-DD")),
      parseInt(convertTime12to24(endTimes))
    ); // 5:00 PM

    let date = daySelected.valueOf();
    const name = "Shift";
    let start_time = startTimes;
    let end_time = endTimes;
    if (note) {
      status = "Edited";
    }
    if (date2 < date1) {
      end_time = "11:59 PM";
      dispatch(
        patchEvent(
          eventID,
          company,
          employee,
          client,
          name,
          start_time,
          end_time,
          note,
          status,
          date
        )
      );
      start_time = "12:00 AM";
      end_time = endTimes;
      date = dayjs(daySelected).add(1, "day").valueOf();
      dispatch(
        createEvent(
          company,
          employee,
          client,
          name,
          start_time,
          end_time,
          note,
          status,
          date
        )
      );
    } else {
      dispatch(
        patchEvent(
          eventID,
          company,
          employee,
          client,
          name,
          start_time,
          end_time,
          note,
          status,
          date
        )
      );
    }
  };

  const publishHandler = () => {
    let id = schID.month.id;
    dispatch(publish(id));
  };

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Event",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteEvent(id));
      }
    });
  };

  // Menubar Items
  const menu = [
    { name: "Month Setup", url: "/app/rota" },
    { name: "Manage Schedule", active: true, url: "/app/schedule" },
    { name: "Time Sheet", url: "/app/reports" },
  ];

  const duplicateDays = (e) => {
    e.preventDefault();
    let date;
    const name = "Shift";
    let start_time = startTimes;
    let end_time = endTimes;
    let today = daySelected.valueOf();
    let arr = [];
    for (var i = 0; i < days; i++) {
      if (date === undefined) {
        date = dayjs(today).add(1, "day").valueOf();
        dispatch(
          createEvent(
            company,
            employee,
            client,
            name,
            start_time,
            end_time,
            note,
            status,
            date
          )
        );
        // arr.push(dayjs(today).add(1, "day").valueOf());
      } else {
        date = dayjs(date).add(1, "day").valueOf();
        dispatch(
          createEvent(
            company,
            employee,
            client,
            name,
            start_time,
            end_time,
            note,
            status,
            date
          )
        );
        // arr.push(dayjs(date).add(1, "day").valueOf());
      }

      // console.log(newDate);
    }
    console.log(arr);
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle={`${office && office.name} Schedule`} />
        <div className={styles.calendar}>
          <MenuBar menu={menu} />
          <h1>
            Client Name: <b>{office && office.name}</b>
          </h1>
          <div className="btnContainer right">
            <button
              className="btnSM color1"
              onClick={publishHandler}
              type="button"
            >
              <FaTelegramPlane />
              &nbsp;&nbsp; Publish Event
            </button>
          </div>

          <CalendarHeader monthNumber={monthNumber} />
          <div className={styles.monthContainer}>
            {/* SideBar */}
            {/* Month */}
            {pLoading || rLoading || gLoading || rLoading ? (
              <Center>
                <CircularProgress isIndeterminate color="blue" />
              </Center>
            ) : (
              <CalendarMonth month={currentMonth} client={client} />
            )}
          </div>
          <Modal
            isVisible={showEventModal}
            title={selectedEvent ? "Edit Schedule" : "Add Schedule"}
            size="lg"
            content={
              loading || uLoading ? (
                <Center>
                  <CircularProgress isIndeterminate color="blue" />
                </Center>
              ) : !dub ? (
                <form onSubmit={selectedEvent ? updateHandler : handleSubmit}>
                  <div className="techleft__InputFlex">
                    <Select
                      onChange={(e) => setEmployee(e.target.value)}
                      value={employee}
                      title="Employee"
                      options={emp}
                      filter="user"
                      secondaryFilter="first_name"
                      secondaryValue="id"
                      concat="last_name"
                      required={true}
                      form={true}
                    />
                    {/* <div className="test__InputContainer md">
                      <label>Start Time</label>
                      <TimeInput
                        value={startTime}
                        hour12Format
                        eachInputDropdown
                        manuallyDisplayDropdown
                        onChange={startTimeHandler}
                      />
                    </div>
                    <div className="test__InputContainer md">
                      <label>End Time</label>
                      <TimeInput
                        value={endTime}
                        hour12Format
                        eachInputDropdown
                        manuallyDisplayDropdown
                        onChange={endTimeHandler}
                      />
                    </div> */}
                    <Input
                      type="time"
                      onChange={startTimeHandler}
                      value={startTime}
                      title="Start Time"
                      form={true}
                      required={true}
                    />
                    <Input
                      type="time"
                      onChange={endTimeHandler}
                      value={endTime}
                      title="End Time"
                      form={true}
                      required={true}
                    />
                    {selectedEvent && (
                      <Textarea
                        type="text"
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                        title="Note"
                        form={true}
                      />
                    )}
                    <Button
                      title={selectedEvent ? "Update" : "Add"}
                      type="submit"
                      color="color1"
                      isFullWidth={true}
                    />
                    {selectedEvent && (
                      <>
                        <Button
                          title={"Delete"}
                          type="button"
                          color="color3"
                          onClick={() => deleteHandler(selectedEvent.id)}
                          isFullWidth={true}
                        />
                        <Button
                          title={"Duplicate"}
                          type="button"
                          color="yellow"
                          onClick={() => setDub(true)}
                          isFullWidth={true}
                        />
                      </>
                    )}
                  </div>
                </form>
              ) : (
                <form onSubmit={duplicateDays}>
                  <div className="techleft__InputFlex">
                    <Select
                      onChange={(e) => setEmployee(e.target.value)}
                      value={employee}
                      title="Employee"
                      options={allEmp}
                      filter="user"
                      secondaryFilter="first_name"
                      secondaryValue="id"
                      concat="last_name"
                      required={true}
                      form={true}
                      readOnly={true}
                    />

                    <Input
                      type="text"
                      onChange={(e) => setStartTime(e.target.value)}
                      value={startTimes}
                      title="Start Time"
                      form={true}
                      readOnly={true}
                    />
                    <Input
                      type="text"
                      onChange={(e) => setEndTime(e.target.value)}
                      value={endTimes}
                      title="End Time"
                      form={true}
                      readOnly={true}
                    />
                    <Input
                      type="number"
                      onChange={(e) => setDays(e.target.value)}
                      value={days}
                      title="Number of Days"
                      form={true}
                      required={true}
                    />
                    <Button
                      title={"Duplicate"}
                      type="submit"
                      color="color1"
                      isFullWidth={true}
                    />
                  </div>
                </form>
              )
            }
            onClose={closeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
