import React, { useState, useEffect } from "react";
import {
  Header,
  Navigation,
  Input,
  Button,
  Textarea,
  Select,
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
  fetchEmployee,
} from "../../redux/actions/employeeActions";
import { CREATE_EMPLOYEE_RESET } from "../../redux/constants/employeeConstants";
import { getMyCompany } from "../../redux/actions/companyActions";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const AddEmployees = () => {
  // Helpers
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const addEmployee = useSelector((state) => state.addEmployee);
  const { loading, error, success } = addEmployee;

  const getBranch = useSelector((state) => state.getBranch);
  const { branches } = getBranch;

  const getDepartment = useSelector((state) => state.getDepartment);
  const { departments } = getDepartment;

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany = [] } = getCompany;
  const company = myCompany[0] ? myCompany[0].id : "";
  const password = "password@1";

  const [first_name, setFirstname] = useState("");
  const [middle_name, setMiddlename] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [department, setDepartment] = useState("");
  const [employee_id, setEmployeeID] = useState("");
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

  if (success) {
    toast({
      title: "Notification",
      description: "Employee added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(fetchEmployee());
    dispatch({ type: CREATE_EMPLOYEE_RESET });
    navigate("/app/employees");
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
      // middle_name,
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
        join_date,
        phone
      )
    );
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Employee" />
        <div className={styles.company}>
          <div className={styles.branch}>
            <div className="btnContainer">
              <Link to="/app/employees" className="btnSM color1">
                Go Back
              </Link>
            </div>

            <div className="formPadding">
              <form onSubmit={branchHandler}>
                <div className="test__InputFlex">
                  <Input
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={first_name}
                    required={true}
                    title="First Name"
                    form={true}
                  />
                  {/* <Input
                    type="text"
                    onChange={(e) => setMiddlename(e.target.value)}
                    value={middle_name}
                    // required={true}
                    title="Middle Name"
                    form={true}
                  /> */}
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
                    size="md"
                  />
                  <Textarea
                    title="Hobbies"
                    value={hobbies}
                    onChange={(e) => setHobbies(e.target.value)}
                    // required={true}
                    form={true}
                    size="md"
                  />

                  <Button
                    title={"Add Employee"}
                    type="submit"
                    color="color2"
                    loading={loading}
                    isFullWidth={true}
                    Icon={FaPlusCircle}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployees;
