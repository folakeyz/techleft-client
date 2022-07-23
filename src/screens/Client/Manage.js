import React, { useState, useEffect } from "react";
import {
  Header,
  Navigation,
  Button,
  Select,
  Modal,
  Text,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import {
  createEClient,
  fetchSingleClient,
  removeEClient,
} from "../../redux/actions/clientActions";
import {
  CREATE_CLIENT_RESET,
  DELETE_CLIENT_RESET,
  GET_CLIENT_RESET,
  UPDATE_CLIENT_RESET,
} from "../../redux/constants/clientConstants";
import MaterialTable from "material-table";
import { getMyCompany } from "../../redux/actions/companyActions";
import { useParams } from "react-router-dom";
import { fetchEmployee } from "../../redux/actions/employeeActions";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ManageClient = () => {
  const { clientID } = useParams();
  // Helpers

  //Table data
  const columns = [
    { title: "First Name", field: "user.first_name" },
    { title: "Last Name", field: "user.last_name" },
    { title: "Email", field: "user.email" },
    { title: "Employee ID", field: "user.employee_id" },
  ];

  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();

  const getEmployee = useSelector((state) => state.getEmployee);
  const { employees: allEmp = [] } = getEmployee;

  const addEClient = useSelector((state) => state.addEClient);
  const { loading, error, success } = addEClient;

  const singleClient = useSelector((state) => state.singleClient);
  const {
    loading: gLoading,
    error: gError,
    client = {},
    emp = [],
  } = singleClient;

  const updateClient = useSelector((state) => state.updateClient);
  const { loading: uLoading, error: uError, success: uSuccess } = updateClient;

  const removeClient = useSelector((state) => state.removeClient);
  const { loading: rLoading, error: rError, success: rSuccess } = removeClient;

  // const getCompany = useSelector((state) => state.getCompany);
  // const { myCompany = [] } = getCompany;
  // const company = myCompany[0] ? myCompany[0].id : "";

  const [open, setOpen] = useState(false);

  //   const [id, setID] = useState("");
  const [id, setID] = useState("");
  const name = client.name;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_CLIENT_RESET });
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
    dispatch({ type: GET_CLIENT_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Client added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    dispatch(fetchSingleClient(clientID));
    dispatch({ type: CREATE_CLIENT_RESET });
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
    setOpen(false);
    dispatch({ type: UPDATE_CLIENT_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Client updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    dispatch(fetchSingleClient(clientID));
    dispatch({ type: UPDATE_CLIENT_RESET });
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
    dispatch({ type: DELETE_CLIENT_RESET });
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
    dispatch(fetchSingleClient(clientID));
    dispatch({ type: DELETE_CLIENT_RESET });
  }

  useEffect(() => {
    dispatch(fetchSingleClient(clientID));
    dispatch(getMyCompany());
    dispatch(fetchEmployee());
  }, [dispatch, clientID]);

  const branchHandler = (e) => {
    e.preventDefault();
    const employee = {
      id,
    };
    dispatch(createEClient(clientID, employee, name));
  };

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Employee",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeEClient(id, clientID));
      }
    });
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Client" />
        <div className={styles.company}>
          <div className="btnContainer">
            <Link to="/app/client" className="btnSM color1">
              Go Back
            </Link>
          </div>
          <div className={styles.clientProfile}>
            <Text title="Name" value={client.name} />
            <Text title="Email" value={client.email} />
            <Text title="Phone Number" value={client.phone} />
            <Text title="Postal Code" value={client.postal_code} />
            <Text title="Country" value={client.country} />
            <Text title="Province" value={client.province} />
            <Text title="Address" value={client.address} />
          </div>
          <div className="btnContainer">
            <Button
              title="Add Employee"
              onClick={() => setOpen(true)}
              type="button"
              color="color2"
              className="btnTable"
            />
          </div>
          {rLoading || gLoading ? (
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          ) : (
            <div className={styles.branch}>
              <MaterialTable
                title=""
                columns={columns}
                data={emp}
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
                  {
                    icon: "launch",
                    iconProps: { style: { fontSize: "20px", color: "gold" } },
                    tooltip: "Remove",
                    onClick: (event, rowData) => {
                      deleteHandler(rowData.id);
                    },
                    title: "Remove",
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
          title={"Add Employee"}
          size="xl"
          content={
            <div className="techleft__InputFlex">
              {uLoading || loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="#087E8C" />
                </Center>
              ) : (
                <>
                  <Select
                    onChange={(e) => setID(e.target.value)}
                    value={id}
                    title="Employee"
                    options={allEmp}
                    filter="user"
                    secondaryFilter="first_name"
                    secondaryValue="id"
                    concat="last_name"
                  />

                  <Button
                    title={"Add Employee"}
                    onClick={branchHandler}
                    type="button"
                    color="color2"
                  />
                </>
              )}
            </div>
          }
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default ManageClient;
