import React, { useState, useEffect } from "react";
import { Input, Button, TopNav,Select,Textarea,DateInput,Options } from "../../../components";
import styles from "../styles.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { AcceptInvite, DemoAcct } from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { JOIN_RESET } from "../../../redux/constants/userConstants";
import { FaEnvelope,FaUser,FaMobileAlt,FaMapMarkerAlt,FaBuilding } from "react-icons/fa";

const Invite = () => {
  // Helpers
  const toast = useToast();
  const {company} = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Fields OnChange
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employee_id, setEmployeeID] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [join_date, setJoinDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Login Handler
  const loginHandler = (e) => {
    e.preventDefault();
    // if (!name || !email || !mobile || !location || !industry) {
    //   toast({
    //     title: "Warning",
    //     description: "All Fields are required",
    //     status: "error",
    //     duration: 9000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
    // } else {
    //   dispatch(DemoAcct(name, email, mobile, location, industry));
    // }
    if (password === confirmPassword) {
         const user = {
            first_name,
            // middle_name,
            last_name,
            username,
            email,
            password,
          };
          dispatch(
            AcceptInvite(
                user,
                company,
                date_of_birth,
                address,
                province,
                country,
                postal_code,
                hobbies,
                join_date,
                phone,
                employee_id
            )
          );
      } else {
        toast({
          title: "Error",
          description: "Password does not match",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }

  };

  // Login state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userJoin = useSelector((state) => state.userJoin);
  const { loading, success, error } = userJoin;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: JOIN_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Account Created Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: JOIN_RESET });
    navigate("/");
  }

  // redirect on userlogin success
  useEffect(() => {
    if (userInfo) {
      navigate("/app/dashboard");
    }
  }, [navigate, userInfo]);
  return (
    <div className={styles.app}>
      <TopNav />
      <div className={styles.container}>
        <div className={styles.formContainerLg}>
          {/* <div className="padding">
            <h3>
              K<span className="danger">NO</span>W MISSED VISITS and
              cross-institutional support WORKERS DOUBLE-BOOKING?
            </h3>
          </div> */}
          {/* <div className="techleft__InputContainer"> */}
            <form onSubmit={loginHandler}>
                <div className="techleft__InputFlex">
                <Input
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={first_name}
                    required={true}
                    title="First Name"
                  />
                  <Input
                    type="text"
                    onChange={(e) => setLastname(e.target.value)}
                    value={last_name}
                    required={true}
                    title="Last Name"
                  />
                  <Input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required={true}
                    title="Username"
                  />
                  <DateInput
                    type="text"
                    onChange={(e) => setDOB(e.target.value)}
                    value={date_of_birth}
                    required={true}
                    title="Date of Birth"
                  />

                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required={true}
                    title="Email"
                  />
                  <Input
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required={true}
                    title="Phone Number"
                  />
                  <Input
                    type="text"
                    onChange={(e) => setEmployeeID(e.target.value)}
                    value={employee_id}
                    // required={true}
                    title="Employee ID"
                  />
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required={true}
                    title="Password"
                  />

                  <Input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required={true}
                    title="Confirm Password"
                  />
                  {/* <Select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    title="Role"
                    options={Options.role}
                    required={true}
                  /> */}
                  {/* <Select
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
                  /> */}
                  <Select
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    title="Country"
                    options={Options.countries}
                    required={true}
                  />
                  <Input
                    type="text"
                    onChange={(e) => setProvince(e.target.value)}
                    value={province}
                    required={true}
                    title="Province"
                  />

                  <Input
                    type="text"
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postal_code}
                    required={true}
                    title="Postal Code"
                  />
                  <DateInput
                    type="text"
                    onChange={(e) => setJoinDate(e.target.value)}
                    value={join_date}
                    required={true}
                    title="Join Date"
                  />
                  <Textarea
                    title="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    // required={true}
                    size="md"
                  />
                  <Textarea
                    title="Hobbies"
                    value={hobbies}
                    onChange={(e) => setHobbies(e.target.value)}
                    // required={true}
                    size="md"
                  />

               <Button
                title="Join"
                type="submit"
                color="yellow"
                loading={loading}
                isFullWidth={true}
                label={true}
              />
                
                </div>
           
             
              <div className={`${styles.padding} ${styles.center}`}>
                <Link to="/login">Already have an account? Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Invite;
