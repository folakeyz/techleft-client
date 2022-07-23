import React, { useState, useEffect } from "react";
import {
  Header,
  Navigation,
  Input,
  Button,
  Textarea,
  Select,
  Modal,
  DateInput,
  Options,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import { fetchBranch } from "../../redux/actions/branchActions";
import { fetchDepartment } from "../../redux/actions/departmentActions";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployee,
  inviteEmployee,
  patchEmployee,
} from "../../redux/actions/employeeActions";
import {
  CREATE_EMPLOYEE_RESET,
  DELETE_EMPLOYEE_RESET,
  GET_EMPLOYEE_RESET,
  SEND_INVITE_RESET,
  UPDATE_EMPLOYEE_RESET,
} from "../../redux/constants/employeeConstants";
import MaterialTable from "material-table";
import { getMyCompany } from "../../redux/actions/companyActions";
import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaWrench,
  FaTrashAlt,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { BsFillCloudUploadFill } from "react-icons/bs";
import swal from "sweetalert";
const Employees = () => {
  //Table data
  const columns = [
    { title: "First Name", field: "user.first_name" },
    { title: "Last Name", field: "user.last_name" },
    { title: "Username", field: "user.username" },
    { title: "Employee ID", field: "user.employee_id" },
    { title: "Email", field: "user.email" },
    { title: "Branch", field: "branch.name" },
    { title: "Department", field: "department.name" },
  ];

  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();

  const addEmployee = useSelector((state) => state.addEmployee);
  const { loading, error, success } = addEmployee;

  const getBranch = useSelector((state) => state.getBranch);
  const { branches } = getBranch;

  const getDepartment = useSelector((state) => state.getDepartment);
  const { departments } = getDepartment;

  const getEmployee = useSelector((state) => state.getEmployee);
  const { loading: gLoading, error: gError, employees } = getEmployee;

  const updateEmployee = useSelector((state) => state.updateEmployee);
  const {
    loading: uLoading,
    error: uError,
    success: uSuccess,
  } = updateEmployee;

  const removeEmployee = useSelector((state) => state.removeEmployee);
  const {
    loading: rLoading,
    error: rError,
    success: rSuccess,
  } = removeEmployee;

  const invitation = useSelector((state) => state.invitation);
  const { loading: iLoading, error: iError, success: iSuccess } = invitation;

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany = [] } = getCompany;
  const company = myCompany[0] ? myCompany[0].id : "";
  const password = "password@1";
  const [iOpen, setIOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [cUsername, setCUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [department, setDepartment] = useState("");
  const [employee_id, setEmployeeID] = useState("");
  const [cEmployee_id, setCEmployeeID] = useState("");
  const [role, setRole] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [join_date, setJoinDate] = useState("");

  const filteredDept =
    departments && branch
      ? departments.filter((x) => x.branch.id === parseInt(branch))
      : [];

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_EMPLOYEE_RESET });
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
    dispatch({ type: GET_EMPLOYEE_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Employee added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    dispatch(fetchEmployee());
    dispatch({ type: CREATE_EMPLOYEE_RESET });
    setFirstname("");
    setLastname("");
    setDOB("");
    setUsername("");
    setEmail("");
    setPhone("");
    setEmployeeID("");
    setRole("");
    setDepartment("");
    setBranch("");
    setCountry("");
    setProvince("");
    setJoinDate("");
    setAddress("");
    setHobbies("");
    setPostalCode("");
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
    dispatch({ type: UPDATE_EMPLOYEE_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Employee updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    setEdit(false);
    dispatch(fetchEmployee());
    dispatch({ type: UPDATE_EMPLOYEE_RESET });
    setFirstname("");
    setLastname("");
    setDOB("");
    setUsername("");
    setEmail("");
    setPhone("");
    setEmployeeID("");
    setRole("");
    setDepartment("");
    setBranch("");
    setCountry("");
    setProvince("");
    setJoinDate("");
    setAddress("");
    setHobbies("");
    setPostalCode("");
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
    dispatch({ type: DELETE_EMPLOYEE_RESET });
  }
  if (rSuccess) {
    toast({
      title: "Notification",
      description: "Employee deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(fetchEmployee());
    dispatch({ type: DELETE_EMPLOYEE_RESET });
  }

  if (iError) {
    toast({
      title: "Error",
      description: iError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: SEND_INVITE_RESET });
  }
  if (iSuccess) {
    toast({
      title: "Notification",
      description: "Invite sent Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setIOpen(false);
    dispatch({ type: SEND_INVITE_RESET });
  }

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchDepartment());
    dispatch(fetchBranch());
    dispatch(getMyCompany());
  }, [dispatch]);

  const branchHandler = (e) => {
    e.preventDefault();
    const user = {
      // User: {

      // },
      first_name,
      last_name,
      username,
      email,
      password,
    };
    dispatch(
      createEmployee(
        user,
        company,
        branch,
        department,
        employee_id,
        role,
        date_of_birth,
        address,
        province,
        country,
        postal_code,
        hobbies,
        join_date
      )
    );
  };
  const editHandler = (e) => {
    e.preventDefault();
    const user = {
      first_name,
      last_name,
      password,
      username: cUsername !== username ? username : undefined,
      email: cEmail !== email ? email : undefined,
    };
    dispatch(
      patchEmployee(
        id,
        user,
        company,
        branch,
        department,
        role,
        date_of_birth,
        address,
        province,
        country,
        postal_code,
        hobbies,
        join_date,
        phone,
        cEmployee_id !== employee_id ? employee_id : undefined
      )
    );
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
        dispatch(deleteEmployee(id));
      }
    });
  };

  const inviteHandler = (e) => {
    e.preventDefault();
    dispatch(inviteEmployee(email));
  };

  const openHandler = () => {
    setEdit(false);
    setOpen(true);
    setFirstname("");
    setLastname("");
    setDOB("");
    setUsername("");
    setEmail("");
    setPhone("");
    setEmployeeID("");
    setRole("");
    setDepartment("");
    setBranch("");
    setCountry("");
    setProvince("");
    setJoinDate("");
    setAddress("");
    setHobbies("");
    setPostalCode("");
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Employee" />
        <div className={styles.company}>
          {rLoading || gLoading ? (
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          ) : (
            <div className={styles.branch}>
              <div className="btnContainer right">
                <Link to="/app/employee/add" className="btnSM color2">
                  <FaPlusCircle />
                  &nbsp;&nbsp; Add Employee
                </Link>
                <Link to="/app/employee/batch" className="btnSM color2">
                  <BsFillCloudUploadFill />
                  &nbsp;&nbsp;Batch Upload
                </Link>
                <span onClick={() => setIOpen(true)} className="btnSM yellow">
                  <FaEnvelopeOpenText /> &nbsp;&nbsp; Email Invite
                </span>
              </div>

              <MaterialTable
                title=""
                columns={columns}
                data={employees}
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
                      setFirstname(rowData.user.first_name);
                      setLastname(rowData.user.last_name);
                      setDOB(rowData.date_of_birth);
                      setUsername(rowData.user.username);
                      setCUsername(rowData.user.username);
                      setEmail(rowData.user.email);
                      setCEmail(rowData.user.email);
                      setPhone(rowData.user.phone);
                      setEmployeeID(rowData.user.employee_id);
                      setCEmployeeID(rowData.user.employee_id);
                      setRole(rowData.user.role);
                      setDepartment(rowData.department.id);
                      setBranch(rowData.branch.id);
                      setCountry(rowData.country);
                      setProvince(rowData.province);
                      setJoinDate(rowData.join_date);
                      setAddress(rowData.address);
                      setHobbies(rowData.hobbies);
                      setPostalCode(rowData.postal_code);
                      setPhone(rowData.phone);
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
          title={edit ? "Edit Employee" : "Add Employee"}
          size="xl"
          content={
            <>
              {uLoading || loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="#087E8C" />
                </Center>
              ) : (
                <form onSubmit={edit ? editHandler : branchHandler}>
                  <div className="test__InputFlex">
                    <Input
                      type="text"
                      onChange={(e) => setFirstname(e.target.value)}
                      value={first_name}
                      required={true}
                      title="First Name"
                      form={true}
                    />
                    <Input
                      type="text"
                      onChange={(e) => setLastname(e.target.value)}
                      value={last_name}
                      required={true}
                      title="Last Name"
                      form={true}
                    />
                    <Input
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      required={true}
                      title="Username"
                      form={true}
                      // readOnly={edit ? true : false}
                    />
                    <DateInput
                      type="text"
                      onChange={(e) => setDOB(e.target.value)}
                      value={date_of_birth}
                      required={true}
                      title="Date of Birth"
                      form={true}
                    />

                    <Input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required={true}
                      title="Email"
                      form={true}
                      // readOnly={edit ? true : false}
                    />
                    <Input
                      type="number"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      required={true}
                      title="Phone Number"
                      form={true}
                    />
                    <Input
                      type="text"
                      onChange={(e) => setEmployeeID(e.target.value)}
                      value={employee_id}
                      // required={true}
                      title="Employee ID"
                      form={true}
                      // readOnly={edit ? true : false}
                    />
                    <Select
                      onChange={(e) => setRole(e.target.value)}
                      value={role}
                      title="Role"
                      options={Options.role}
                      form={true}
                      required={true}
                    />
                    <Select
                      onChange={(e) => setBranch(e.target.value)}
                      value={branch}
                      title="Branch"
                      options={branches}
                      filter="name"
                      filterValue="id"
                      form={true}
                      required={true}
                    />
                    <Select
                      onChange={(e) => setDepartment(e.target.value)}
                      value={department}
                      title="Department"
                      options={filteredDept}
                      filter="name"
                      filterValue="id"
                      form={true}
                    />
                    <Select
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                      title="Country"
                      options={Options.countries}
                      form={true}
                      required={true}
                    />
                    <Input
                      type="text"
                      onChange={(e) => setProvince(e.target.value)}
                      value={province}
                      required={true}
                      title="Province"
                      form={true}
                    />

                    <Input
                      type="text"
                      onChange={(e) => setPostalCode(e.target.value)}
                      value={postal_code}
                      required={true}
                      title="Postal Code"
                      form={true}
                    />
                    <DateInput
                      type="text"
                      onChange={(e) => setJoinDate(e.target.value)}
                      value={join_date}
                      required={true}
                      title="Join Date"
                      form={true}
                    />
                    <Textarea
                      title="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      // required={true}
                      form={true}
                    />
                    <Textarea
                      title="Hobbies"
                      value={hobbies}
                      onChange={(e) => setHobbies(e.target.value)}
                      // required={true}
                      form={true}
                    />

                    <Button
                      title={edit ? "Edit Employee" : "Add Employee"}
                      type="submit"
                      color="color2"
                    />
                  </div>
                </form>
              )}
            </>
          }
          onClose={() => setOpen(false)}
        />

        <Modal
          isVisible={iOpen}
          title={"Send Company Invite"}
          size="md"
          content={
            <form onSubmit={inviteHandler}>
              <div className="techleft__InputFlex">
                {iLoading ? (
                  <Center>
                    <CircularProgress isIndeterminate color="#087E8C" />
                  </Center>
                ) : (
                  <>
                    <Input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required={true}
                      title="Email"
                      size="techleft__adult"
                    />

                    <Button
                      title={"Send Invite"}
                      type="submit"
                      color="color2"
                    />
                  </>
                )}
              </div>
            </form>
          }
          onClose={() => setIOpen(false)}
        />
      </div>
    </div>
  );
};

export default Employees;
