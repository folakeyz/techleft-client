import React, { useState, useEffect } from "react";
import {
  Header,
  Navigation,
  Button,
  Select,
  Modal,
  MenuBar,
  Options,
  Input,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import {
  createSchedule,
  deleteSchedule,
  duplicateSchedule,
  fetchSchedule,
  patchSchedule,
} from "../../redux/actions/scheduleActions";
import {
  CREATE_SCHEDULE_RESET,
  DELETE_SCHEDULE_RESET,
  DUB_SCHEDULE_RESET,
  GET_SCHEDULE_RESET,
  UPDATE_SCHEDULE_RESET,
} from "../../redux/constants/scheduleConstants";
import MaterialTable from "material-table";
import { getMyCompany } from "../../redux/actions/companyActions";
import { fetchClient } from "../../redux/actions/clientActions";
import {
  fetchRota,
  createRota,
  deleteRota,
} from "../../redux/actions/rotaActions";
import { useNavigate, Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  FaPlusCircle,
  FaWrench,
  FaTrashAlt,
  FaCog,
  FaCopy,
  FaSearchengin,
} from "react-icons/fa";
import { CREATE_ROTA_RESET } from "../../redux/constants/rotaConstants";
import swal from "sweetalert";

const Schedule = () => {
  const navigate = useNavigate();
  //Table data
  const columns = [
    { title: "Client", field: "client.name" },
    { title: "Month", field: "month.month" },
    { title: "Year", field: "month.year" },
  ];

  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();

  const addRota = useSelector((state) => state.addRota);
  const {
    loading: mLoading,
    error: mError,
    success: mSuccess,
    response,
  } = addRota;

  const addSchedule = useSelector((state) => state.addSchedule);
  const { loading, error, success } = addSchedule;

  const dubSchedule = useSelector((state) => state.dubSchedule);
  const {
    loading: dubLoading,
    error: dubError,
    success: dubSuccess,
  } = dubSchedule;

  const getSchedule = useSelector((state) => state.getSchedule);
  const { loading: gLoading, error: gError, schedules } = getSchedule;

  const updateSchedule = useSelector((state) => state.updateSchedule);
  const {
    loading: uLoading,
    error: uError,
    success: uSuccess,
  } = updateSchedule;

  const removeSchedule = useSelector((state) => state.removeSchedule);
  const {
    loading: rLoading,
    error: rError,
    success: rSuccess,
  } = removeSchedule;

  const getClient = useSelector((state) => state.getClient);
  const { clients } = getClient;
  const getRota = useSelector((state) => state.getRota);
  const { rotas } = getRota;

  // const getCompany = useSelector((state) => state.getCompany);
  // const { myCompany = [] } = getCompany;
  // const company = myCompany[0] ? myCompany[0].id : "";

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dub, setDub] = useState(false);
  const [id, setID] = useState("");

  const [client, setClient] = useState("");
  const [month, setMonth] = useState("");
  const [index, setIndex] = useState(0);
  const [year, setYear] = useState(dayjs().year());

  if (error || mError) {
    toast({
      title: "Error",
      description: error || mError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_SCHEDULE_RESET });
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
    dispatch({ type: GET_SCHEDULE_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Schedule added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    setDub(false);
    dispatch(fetchSchedule());
    dispatch({ type: CREATE_SCHEDULE_RESET });
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
    dispatch({ type: UPDATE_SCHEDULE_RESET });
  }

  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Schedule updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    setEdit(false);
    dispatch(fetchSchedule());
    dispatch({ type: UPDATE_SCHEDULE_RESET });
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
    dispatch({ type: DELETE_SCHEDULE_RESET });
  }
  if (rSuccess) {
    toast({
      title: "Notification",
      description: "Schedule deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(fetchSchedule());
    dispatch({ type: DELETE_SCHEDULE_RESET });
  }

  if (dubError) {
    toast({
      title: "Error",
      description: dubError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: DUB_SCHEDULE_RESET });
  }

  if (dubSuccess) {
    toast({
      title: "Notification",
      description: "Schedule duplicated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    setEdit(false);
    setDub(false);
    dispatch(fetchSchedule());
    dispatch({ type: DUB_SCHEDULE_RESET });
  }

  useEffect(() => {
    dispatch(fetchSchedule());
    dispatch(fetchClient());
    dispatch(fetchRota());
    dispatch(getMyCompany());
  }, [dispatch]);

  const branchHandler = (e) => {
    e.preventDefault();
    // dispatch(createRota(month, year, index));
    dispatch(createSchedule(client, month));
  };
  // if (mSuccess) {
  //   dispatch({ type: CREATE_ROTA_RESET });
  // }
  const editHandler = (e) => {
    e.preventDefault();
    dispatch(patchSchedule(id, client, month));
  };

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this schedule",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteSchedule(id));
      }
    });
  };

  const dubHandler = (e) => {
    e.preventDefault();
    dispatch(duplicateSchedule(client, month));
  };

  // Menubar Items
  const menu = [
    { name: "Month Setup", url: "/app/rota" },
    { name: "Manage Schedule", active: true, url: "/app/schedule" },
    { name: "Time Sheet", url: "/app/reports" },
  ];

  const openHandler = () => {
    setOpen(true);
    setEdit(false);
    setDub(false);
  };
  const monthHandler = (e) => {
    let idx = e.target.value;
    const months = Options.month;
    const monthIndex = months.filter((x) => x.value === idx);
    setMonth(e.target.value);
    setIndex(monthIndex[0].index);
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Schedule" />
        <div className={styles.company}>
          <MenuBar menu={menu} />
          {rLoading || gLoading ? (
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          ) : (
            <div className={styles.branch}>
              <div className="btnContainer right">
                <button
                  className="btnSM color2"
                  onClick={openHandler}
                  type="button"
                >
                  <FaPlusCircle />
                  &nbsp;&nbsp; Add Schedule
                </button>

                <Link to="/app/schedule/all" className="btnSM color1">
                  <FaSearchengin />
                  &nbsp;&nbsp; All Schedules
                </Link>
              </div>

              <MaterialTable
                title=""
                columns={columns}
                data={schedules}
                options={{
                  exportAllData: true,
                  exportButton: true,
                  actionsCellStyle: {
                    backgroundColor: "none",
                    color: "#FF00dd",
                  },
                  actionsColumnIndex: -1,

                  headerStyle: {
                    backgroundColor: "#dcdcdc",
                    color: "black",
                    fontWeight: "bold",
                  },
                }}
                style={{
                  boxShadow: "none",
                  width: "100%",
                  background: "none",
                  fontSize: "13px",
                }}
                actions={[
                  {
                    icon: "launch",
                    iconProps: { style: { fontSize: "20px", color: "gold" } },
                    tooltip: "Manage",
                    onClick: (event, rowData) => {
                      navigate(
                        `/app/assistant/${rowData.client.id}/${rowData.id}`
                      );
                    },
                    title: "Manage",
                    color: "color2",
                    Icon: FaCog,
                  },
                  // {
                  //   icon: "launch",
                  //   iconProps: { style: { fontSize: "20px", color: "gold" } },
                  //   tooltip: "Edit",
                  //   onClick: (event, rowData) => {
                  //     setOpen(true);
                  //     setEdit(true);
                  //     setMonth(rowData.month.id);
                  //     setClient(rowData.client.id);

                  //     setID(rowData.id);
                  //   },
                  //   title: "Edit",
                  //   color: "color2",
                  //   Icon: FaWrench,
                  // },
                  // {
                  //   icon: "launch",
                  //   iconProps: { style: { fontSize: "20px", color: "gold" } },
                  //   tooltip: "Duplicate",
                  //   onClick: (event, rowData) => {
                  //     setOpen(true);
                  //     setDub(true);
                  //     setMonth(rowData.month.id);
                  //   },
                  //   title: "Duplicate",
                  //   color: "color2",
                  //   Icon: FaCopy,
                  // },
                  {
                    icon: "launch",
                    iconProps: { style: { fontSize: "20px", color: "gold" } },
                    tooltip: "Delete",
                    onClick: (event, rowData) => {
                      deleteHandler(rowData.id);
                    },
                    title: "Delete",
                    color: "color3",
                    Icon: FaTrashAlt,
                  },
                ]}
                components={{
                  Action: (props) => (
                    <button
                      onClick={(event) =>
                        props.action.onClick(event, props.data)
                      }
                      className={`btnTable ${props.action.color}`}
                    >
                      <props.action.Icon /> {props.action.title}
                    </button>
                  ),
                }}
              />
            </div>
          )}
        </div>
        <Modal
          isVisible={open}
          title={
            edit ? "Edit Schedule" : dub ? "Duplicate Schedule" : "Add Schedule"
          }
          size="md"
          content={
            <form
              onSubmit={edit ? editHandler : dub ? dubHandler : branchHandler}
            >
              <div className="test__InputFlex">
                <Select
                  onChange={(e) => setClient(e.target.value)}
                  value={client}
                  title="Client"
                  options={clients}
                  filter="name"
                  filterValue="id"
                  form={true}
                  required={true}
                  size="lg"
                />
                <Select
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                  title="Month"
                  options={rotas}
                  filter="month"
                  filterValue="id"
                  form={true}
                  required={true}
                  size="lg"
                />

                {/* {dub ? (
                  <></>
                ) : (
                  <>
                    <Select
                      onChange={monthHandler}
                      value={month}
                      title="Month"
                      options={Options.month}
                      form={true}
                      size="lg"
                      required={true}
                    />
                    <Input
                      type="year"
                      onChange={(e) => setYear(e.target.value)}
                      value={year}
                      required={true}
                      title="Year"
                      form={true}
                      size="lg"
                      readOnly={dub}
                    />
                  </>
                )} */}

                <Button
                  title={
                    edit
                      ? "Edit Schedule"
                      : dub
                      ? "Duplicate Schedule"
                      : "Add Schedule"
                  }
                  type="submit"
                  color="color2"
                  isFullWidth={true}
                  loading={uLoading || loading || dubLoading}
                  size="lg"
                  Icon={edit ? FaWrench : FaPlusCircle}
                />
              </div>
            </form>
          }
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default Schedule;
