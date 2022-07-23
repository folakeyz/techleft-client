import React, { useState, useContext, useEffect } from "react";
import {
  Header,
  Navigation,
  Modal,
  Input,
  Button,
  Textarea,
} from "../../components";
import { CalendarHeader, CalendarMonth } from "../../components";
import { getMonth } from "../../components/utils";
import styles from "./styles.module.css";
import GlobalContext from "../../context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { getMyCompany } from "../../redux/actions/companyActions";
// import { useParams } from "react-router-dom";
import { fetchEmployee } from "../../redux/actions/employeeActions";
import {
  fetchClient,
  // fetchSingleClient,
} from "../../redux/actions/clientActions";
import {
  // createEvent,
  // deleteEvent,
  fetchEvent,
  // patchEvent,
  userpatchEvent,
} from "../../redux/actions/eventActions";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import {
  // CREATE_EVENT_RESET,
  DELETE_EVENT_RESET,
  GET_EVENT_RESET,
  UPDATE_EVENT_RESET,
} from "../../redux/constants/eventConstants";
import { fetchSchedule } from "../../redux/actions/scheduleActions";
import { fetchRota } from "../../redux/actions/rotaActions";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const ClientAssistant = () => {
  const { client } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany = [] } = getCompany;

  const company = myCompany[0] ? myCompany[0].id : "";

  const getEvent = useSelector((state) => state.getEvent);
  const {
    // loading: gLoading,
    error: gError,
  } = getEvent;
  // const userProfile = useSelector((state) => state.userProfile);
  // const { user } = userProfile;
  // const getEmployee = useSelector((state) => state.getEmployee);
  // const { employees } = getEmployee;

  // const myDetails =
  //   employees && employees.find((x) => x.employee_id === user.employee_id);

  // const client =
  //   myDetails && myDetails.clients && myDetails.clients[0]
  //     ? myDetails.clients[0].id
  //     : 0;

  const updateEvent = useSelector((state) => state.updateEvent);
  const { loading: uLoading, error: uError, success: uSuccess } = updateEvent;

  const removeEvent = useSelector((state) => state.removeEvent);
  const {
    // loading: rLoading,
    error: rError,
    success: rSuccess,
  } = removeEvent;

  // const getSchedule = useSelector((state) => state.getSchedule);
  // const { schedules = [] } = getSchedule;
  //const schID = events && events.find((x) => x.employee.user.id === user && user.id);

  //   const monthNumber = schID ? schID.month.index : 0;

  const {
    //  daySelected,
    setShowEventModal,
    showEventModal,
    selectedEvent,
  } = useContext(GlobalContext);
  const getRota = useSelector((state) => state.getRota);
  const { rotas = [], loading } = getRota;
  const filterRota = rotas.find((x) => x.is_active === true);

  const currentMonth = getMonth(parseInt(filterRota ? filterRota.index : 0));
  const monthNumber = filterRota ? filterRota.index : 0;

  const [id, setID] = useState("");
  // const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (selectedEvent) {
      setID(selectedEvent.id);
      setStartTime(selectedEvent.start_time);
      setEndTime(selectedEvent.end_time);
      setNote(selectedEvent.note);
      setDate(dayjs(parseInt(selectedEvent.date)).format("DD-MM-YYYY"));
    }
    dispatch(fetchClient());
    dispatch(fetchEmployee());
  }, [monthNumber, selectedEvent, dispatch]);

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
    dispatch(fetchEvent());
    setShowEventModal(false);
    dispatch({ type: UPDATE_EVENT_RESET });
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
      description: "Client deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(fetchEvent());
    dispatch({ type: DELETE_EVENT_RESET });
  }

  useEffect(() => {
    dispatch(fetchRota());
    dispatch(getMyCompany());
    dispatch(fetchEmployee());
    dispatch(fetchSchedule());

    // dispatch(deleteEvent(id));
  }, [dispatch]);

  const acceptHandler = (e) => {
    e.preventDefault();
    let status = "Started";
    let name = "Shift";
    if (note) {
      status = "Edited";
    }
    dispatch(userpatchEvent(id, company, name, status, note));
  };
  const rejectHandler = (e) => {
    e.preventDefault();
    let status = "Dropped";
    let name = "Shift";
    if (note) {
      status = "Edited";
    }
    dispatch(userpatchEvent(id, company, name, status, note));
  };
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="My Schedules" />
        <div className={styles.calendar}>
          {loading ? (
            <Center>
              <CircularProgress isIndeterminate color="#087E8C" />
            </Center>
          ) : (
            <>
              <CalendarHeader monthNumber={monthNumber} />
              <div className={styles.monthContainer}>
                {/* SideBar */}
                {/* Month */}
                <CalendarMonth month={currentMonth} client={client} />
              </div>
            </>
          )}

          {uLoading ? (
            <Center>
              <CircularProgress isIndeterminate color="#087E8C" />
            </Center>
          ) : (
            <Modal
              isVisible={showEventModal}
              title={"Add Schedule"}
              size="lg"
              content={
                <div className="techleft__InputFlex">
                  <Input
                    type="text"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required={true}
                    title="Date"
                    readOnly={true}
                    form={true}
                  />
                  <Input
                    type="text"
                    onChange={(e) => setStartTime(e.target.value)}
                    value={start_time}
                    required={true}
                    title="Start Time"
                    readOnly={true}
                    form={true}
                  />
                  <Input
                    type="text"
                    onChange={(e) => setEndTime(e.target.value)}
                    value={end_time}
                    required={true}
                    title="End Time"
                    readOnly={true}
                    form={true}
                  />
                  <Textarea
                    type="text"
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    required={true}
                    title="Note"
                    form={true}
                  />

                  <Button
                    title="Accept"
                    onClick={acceptHandler}
                    type="button"
                    color="yellow"
                    isFullWidth={true}
                  />
                  <Button
                    title="Reject"
                    onClick={rejectHandler}
                    type="button"
                    color="color3"
                    isFullWidth={true}
                  />
                </div>
              }
              onClose={() => setShowEventModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientAssistant;
