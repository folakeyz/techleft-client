import React, { useState, useEffect } from "react";
import {
  Header,
  Navigation,
  Input,
  Button,
  Textarea,
  Select,
  Modal,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import { fetchBranch } from "../../redux/actions/branchActions";
import {
  createDepartment,
  deleteDepartment,
  fetchDepartment,
  patchDepartment,
} from "../../redux/actions/departmentActions";
import {
  CREATE_DEPARTMENT_RESET,
  DELETE_DEPARTMENT_RESET,
  GET_DEPARTMENT_RESET,
  UPDATE_DEPARTMENT_RESET,
} from "../../redux/constants/departmentConstants";
import MaterialTable from "material-table";
import { getMyCompany } from "../../redux/actions/companyActions";
import { FaPlusCircle, FaWrench, FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";

const Department = () => {
  //Table data
  const columns = [
    { title: "Name", field: "name" },
    { title: "Branch", field: "branch.name" },
    { title: "Email", field: "email" },
  ];

  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();

  const addDepartment = useSelector((state) => state.addDepartment);
  const { loading, error, success } = addDepartment;

  const getBranch = useSelector((state) => state.getBranch);
  const { branches } = getBranch;

  const getDepartment = useSelector((state) => state.getDepartment);
  const { loading: gLoading, error: gError, departments } = getDepartment;

  const updateDepartment = useSelector((state) => state.updateDepartment);
  const {
    loading: uLoading,
    error: uError,
    success: uSuccess,
  } = updateDepartment;

  const removeDepartment = useSelector((state) => state.removeDepartment);
  const {
    loading: rLoading,
    error: rError,
    success: rSuccess,
  } = removeDepartment;

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany = [] } = getCompany;
  const company = myCompany[0] ? myCompany[0].id : "";

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState("");

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_DEPARTMENT_RESET });
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
    dispatch({ type: GET_DEPARTMENT_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Department added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    dispatch(fetchDepartment());
    dispatch({ type: CREATE_DEPARTMENT_RESET });
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
    dispatch({ type: UPDATE_DEPARTMENT_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Department updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    setEdit(false);
    dispatch(fetchDepartment());
    dispatch({ type: UPDATE_DEPARTMENT_RESET });
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
    dispatch({ type: DELETE_DEPARTMENT_RESET });
  }
  if (rSuccess) {
    toast({
      title: "Notification",
      description: "Department deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(fetchDepartment());
    dispatch({ type: DELETE_DEPARTMENT_RESET });
  }

  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchBranch());
    dispatch(getMyCompany());
  }, [dispatch]);

  const branchHandler = (e) => {
    e.preventDefault();
    dispatch(createDepartment(company, branch, name, email, description));
  };
  const editHandler = (e) => {
    e.preventDefault();
    dispatch(patchDepartment(id, company, branch, name, email, description));
  };

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Department",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteDepartment(id));
      }
    });
  };

  const openHandler = () => {
    setEdit(false);
    setOpen(true);
    setName("");
    setEmail("");
    setDescription("");
    setBranch("");
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Department" />
        <div className={styles.company}>
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
                  &nbsp;&nbsp; Add Department
                </button>
              </div>
              <MaterialTable
                title=""
                columns={columns}
                data={departments}
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
                    tooltip: "Edit",
                    onClick: (event, rowData) => {
                      setOpen(true);
                      setEdit(true);
                      setName(rowData.name);
                      setEmail(rowData.email);
                      setDescription(rowData.description);
                      setBranch(rowData.branch.id);
                      setID(rowData.id);
                    },
                    title: "Edit",
                    color: "yellow",
                    Icon: FaWrench,
                  },
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
          title={edit ? "Edit Department" : "Add Department"}
          size="lg"
          content={
            <form onSubmit={edit ? editHandler : branchHandler}>
              <div className="test__InputFlex">
                <Select
                  onChange={(e) => setBranch(e.target.value)}
                  value={branch}
                  title="Branch"
                  options={branches}
                  filter="name"
                  filterValue="id"
                  form={true}
                />
                <Input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required={true}
                  title="Department Name"
                  form={true}
                />
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required={true}
                  title="Email"
                  form={true}
                />

                <Textarea
                  title="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required={true}
                  form={true}
                />
                <Button
                  title={edit ? "Edit Department" : "Add Department"}
                  type="submit"
                  color="color2"
                  isFullWidth={true}
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

export default Department;
