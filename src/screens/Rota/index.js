import React, { useState, useEffect } from "react";
import {
  Header,
  Navigation,
  Input,
  Button,
  Select,
  Options,
  Modal,
  MenuBar,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import {
  createRota,
  deleteRota,
  fetchRota,
  patchRota,
} from "../../redux/actions/rotaActions";
import {
  CREATE_ROTA_RESET,
  DELETE_ROTA_RESET,
  GET_ROTA_RESET,
  UPDATE_ROTA_RESET,
} from "../../redux/constants/rotaConstants";
import MaterialTable from "material-table";
import { getMyCompany } from "../../redux/actions/companyActions";
import dayjs from "dayjs";
import { FaPlusCircle, FaWrench, FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";

const Rota = () => {
  //Table data
  const columns = [
    { title: "Month", field: "month" },
    { title: "Year", field: "year" },
  ];

  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();

  const addRota = useSelector((state) => state.addRota);
  const { loading, error, success } = addRota;

  const getRota = useSelector((state) => state.getRota);
  const { loading: gLoading, error: gError, rotas } = getRota;

  const updateRota = useSelector((state) => state.updateRota);
  const { loading: uLoading, error: uError, success: uSuccess } = updateRota;

  const removeRota = useSelector((state) => state.removeRota);
  const { loading: rLoading, error: rError, success: rSuccess } = removeRota;

  // const getCompany = useSelector((state) => state.getCompany);
  // const { myCompany = [] } = getCompany;
  // const company = myCompany[0] ? myCompany[0].id : "";

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState("");
  const [month, setMonth] = useState("");
  const [index, setIndex] = useState(0);
  const [year, setYear] = useState(dayjs().year());

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_ROTA_RESET });
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
    dispatch({ type: GET_ROTA_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Rota added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    dispatch(fetchRota());
    dispatch({ type: CREATE_ROTA_RESET });
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
    dispatch({ type: UPDATE_ROTA_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Rota updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    setEdit(false);
    dispatch(fetchRota());
    dispatch({ type: UPDATE_ROTA_RESET });
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
    dispatch({ type: DELETE_ROTA_RESET });
  }
  if (rSuccess) {
    toast({
      title: "Notification",
      description: "Rota deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(fetchRota());
    dispatch({ type: DELETE_ROTA_RESET });
  }

  useEffect(() => {
    dispatch(fetchRota());
    dispatch(getMyCompany());
  }, [dispatch]);

  const branchHandler = (e) => {
    e.preventDefault();
    dispatch(createRota(month, year, index));
  };
  const editHandler = (e) => {
    e.preventDefault();
    dispatch(patchRota(id, month, year, index));
  };

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Month",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteRota(id));
      }
    });
  };

  const monthHandler = (e) => {
    let idx = e.target.value;
    const months = Options.month;
    const monthIndex = months.filter((x) => x.value === idx);
    setMonth(e.target.value);
    setIndex(monthIndex[0].index);
  };

  // Menubar Items
  const menu = [
    { name: "Month Setup", active: true, url: "/app/rota" },
    { name: "Manage Schedule", url: "/app/schedule" },
    { name: "Time Sheet", url: "/app/reports" },
  ];

  const openHandler = () => {
    setMonth("");
    setEdit(false);
    setOpen(true);
  };
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Month Setup" />
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
                  &nbsp;&nbsp; Add Month
                </button>
              </div>
              <MaterialTable
                title=""
                columns={columns}
                data={rotas}
                options={{
                  // filtering: true,
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
                  // {
                  //   icon: "launch",
                  //   iconProps: { style: { fontSize: "20px", color: "gold" } },
                  //   tooltip: "Edit",
                  //   onClick: (event, rowData) => {
                  //     setOpen(true);
                  //     setEdit(true);
                  //     setMonth(rowData.month);
                  //     setYear(rowData.year);
                  //     setID(rowData.id);
                  //   },
                  //   title: "Edit",
                  //   color: "color1",
                  //   Icon: FaWrench,
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
                      <props.action.Icon />
                      {props.action.title}
                    </button>
                  ),
                }}
              />
            </div>
          )}
        </div>
        <Modal
          isVisible={open}
          title={edit ? "Edit Month" : "Add Month"}
          size="md"
          content={
            <form onSubmit={edit ? editHandler : branchHandler}>
              <div className="test__InputFlex">
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
                />
                <Button
                  title={edit ? "Edit Month" : "Add Month"}
                  type="submit"
                  color="color2"
                  isFullWidth={true}
                  size="lg"
                  Icon={edit ? FaWrench : FaPlusCircle}
                  loading={uLoading || loading}
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

export default Rota;
