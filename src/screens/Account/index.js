import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Input,
  Button,
  Textarea,
  Select,
  DateInput,
  Options,
} from "../../components";

const Account = () => {
  const dispatch = useDispatch();
  const password = "password@1";
  const [id, setID] = useState("");
  const [first_name, setFirstname] = useState("");
  const [middle_name, setMiddlename] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employee_id, setEmployeeID] = useState("");
  const [role, setRole] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [join_date, setJoinDate] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      // User: {

      // },
      first_name,
      middle_name,
      last_name,
      username,
      email,
      password,
    };
    // dispatch(
    //   createEmployee(
    //     user,
    //     employee_id,
    //     role,
    //     date_of_birth,
    //     address,
    //     province,
    //     country,
    //     postal_code,
    //     hobbies,
    //     join_date
    //   )
    // );
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="techleft__InputFlex">
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
            onChange={(e) => setMiddlename(e.target.value)}
            value={middle_name}
            // required={true}
            title="Middle Name"
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

          <Button title={"SAVE"} type="submit" color="yellow" />
        </div>
      </form>
    </div>
  );
};

export default Account;
