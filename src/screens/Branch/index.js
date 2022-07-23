import React, { useState, useEffect } from "react";
import {
  Header,
  Navigation,
  Input,
  Button,
  Textarea,
  Select,
  Options,
  Modal,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import {
  createBranch,
  deleteBranch,
  fetchBranch,
  patchBranch,
} from "../../redux/actions/branchActions";
import {
  CREATE_BRANCH_RESET,
  DELETE_BRANCH_RESET,
  GET_BRANCH_RESET,
  UPDATE_BRANCH_RESET,
} from "../../redux/constants/branchConstants";
import MaterialTable from "material-table";
import { getMyCompany } from "../../redux/actions/companyActions";
import { createLocation } from "../../redux/actions/locationActions";
import { CREATE_LOCATION_RESET } from "../../redux/constants/locationConstants";
import {
  FaPlusCircle,
  FaWrench,
  FaTrashAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import swal from "sweetalert";

const Branch = () => {
  //Table data
  const columns = [
    { title: "Name", field: "name" },
    { title: "Country", field: "country" },
    { title: "Postal Code", field: "postal_code" },
    { title: "Address", field: "address" },
  ];

  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();

  const addBranch = useSelector((state) => state.addBranch);
  const { loading, error, success } = addBranch;

  const addLocation = useSelector((state) => state.addLocation);
  const { loading: lLoading, error: lError, success: lSuccess } = addLocation;

  const getBranch = useSelector((state) => state.getBranch);
  const { loading: gLoading, error: gError, branches } = getBranch;

  const updateBranch = useSelector((state) => state.updateBranch);
  const { loading: uLoading, error: uError, success: uSuccess } = updateBranch;

  const removeBranch = useSelector((state) => state.removeBranch);
  const { loading: rLoading, error: rError, success: rSuccess } = removeBranch;

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany = [] } = getCompany;
  const company = myCompany[0] ? myCompany[0].id : "";

  const [iOpen, setIOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  // const [phone_number, setPhoneNumber] = useState([]);
  const [mobile_number, setMobileNumber] = useState([]);
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [max_radius, setMaxRadius] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");

  const phone_numbers = [];

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_BRANCH_RESET });
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
    dispatch({ type: GET_BRANCH_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Branch added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    dispatch(fetchBranch());
    dispatch({ type: CREATE_BRANCH_RESET });
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
    dispatch({ type: UPDATE_BRANCH_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Branch updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    setEdit(false);
    dispatch(fetchBranch());
    dispatch({ type: UPDATE_BRANCH_RESET });
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
    dispatch({ type: DELETE_BRANCH_RESET });
  }
  if (rSuccess) {
    toast({
      title: "Notification",
      description: "Branch deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(fetchBranch());
    dispatch({ type: DELETE_BRANCH_RESET });
  }

  useEffect(() => {
    dispatch(fetchBranch());
    dispatch(getMyCompany());
  }, [dispatch]);

  const branchHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBranch(
        company,
        name,
        email,
        description,
        phone_numbers,
        address,
        province,
        country,
        postal_code
        // contact_person
      )
    );
  };
  const editHandler = (e) => {
    e.preventDefault();
    dispatch(
      patchBranch(
        id,
        company,
        name,
        email,
        description,
        phone_numbers,
        address,
        province,
        country,
        postal_code
        // contact_person
      )
    );
  };

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Branch",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteBranch(id));
      }
    });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const locationHandler = (e) => {
    e.preventDefault();
    dispatch(createLocation(branch, longitude, latitude, max_radius));
  };

  if (lSuccess) {
    toast({
      title: "Notification",
      description: "Location Updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setIOpen(false);
    dispatch(fetchBranch());
    dispatch({ type: CREATE_LOCATION_RESET });
  }

  if (lError) {
    toast({
      title: "Error",
      description: lError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_LOCATION_RESET });
  }

  const openHandler = () => {
    setEdit(false);
    setOpen(true);
    setName("");
    setEmail("");
    setAddress("");
    setPostalCode("");
    setCountry("");
    setDescription("");
    setAddress("");
    setProvince("");
    setContactPerson("");
    // setPhoneNumber("");
    setMobileNumber("");
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Branch" />
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
                  &nbsp;&nbsp; Add Branch
                </button>
              </div>
              <MaterialTable
                title=""
                columns={columns}
                data={branches}
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
                    tooltip: "Update Location",
                    onClick: (event, rowData) => {
                      setBranch(rowData.id);
                      setIOpen(true);
                    },
                    title: "Update",
                    color: "color2",
                    Icon: FaMapMarkerAlt,
                  },
                  {
                    icon: "launch",
                    iconProps: { style: { fontSize: "20px", color: "gold" } },
                    tooltip: "Edit",
                    onClick: (event, rowData) => {
                      setOpen(true);
                      setEdit(true);
                      setName(rowData.name);
                      setEmail(rowData.email);
                      setAddress(rowData.address);
                      setPostalCode(rowData.postal_code);
                      setCountry(rowData.country);
                      setDescription(rowData.description);
                      setAddress(rowData.address);
                      setProvince(rowData.province);
                      setContactPerson(rowData.contact_person);
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
          title={edit ? "Edit Branch" : "Add Branch"}
          size="lg"
          content={
            <form onSubmit={edit ? editHandler : branchHandler}>
              <div className="test__InputFlex">
                <Input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required={true}
                  title="Branch Name"
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
                {/* <Input
                    type="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phone_number}
                    required={true}
                    title="Phone Number"
                  /> */}
                <Input
                  type="number"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  value={mobile_number}
                  required={true}
                  title="Mobile Number"
                  form={true}
                />
                <Select
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  title="Country"
                  options={Options.countries}
                  form={true}
                />
                <Input
                  type="text"
                  onChange={(e) => setProvince(e.target.value)}
                  value={province}
                  required={true}
                  title="Province"
                  form={true}
                />
                {/* <Input
                    type="text"
                    onChange={(e) => setContactPerson(e.target.value)}
                    value={contact_person}
                    required={true}
                    title="Contact Person"
                  /> */}
                <Input
                  type="text"
                  onChange={(e) => setPostalCode(e.target.value)}
                  value={postal_code}
                  required={true}
                  title="Postal Code"
                  form={true}
                />
                <Textarea
                  title="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required={true}
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
                  title={edit ? "Edit Branch" : "Add Branch"}
                  type="submit"
                  color="color2"
                  isFullWidth={true}
                  loading={uLoading || loading}
                  Icon={edit ? FaWrench : FaPlusCircle}
                />
              </div>
            </form>
          }
          onClose={() => setOpen(false)}
        />

        <Modal
          isVisible={iOpen}
          title={edit ? "Edit Location" : "Add Location"}
          size="lg"
          content={
            <form onSubmit={locationHandler}>
              <div className="techleft__InputFlex">
                <div>{status}</div>
                <div className="btnContainer right">
                  <button
                    className="btnSM color1"
                    onClick={getLocation}
                    type="button"
                  >
                    <FaMapMarkerAlt />
                    &nbsp;&nbsp; Get Coordinates
                  </button>
                </div>
                <Input
                  type="text"
                  onChange={(e) => setLatitude(e.target.value)}
                  value={latitude}
                  required={true}
                  title="Latitude"
                  form={true}
                  size="lg"
                />
                <Input
                  type="text"
                  onChange={(e) => setLongitude(e.target.value)}
                  value={longitude}
                  required={true}
                  title="Longitude"
                  form={true}
                  size="lg"
                />

                <Input
                  type="text"
                  onChange={(e) => setMaxRadius(e.target.value)}
                  value={max_radius}
                  required={true}
                  title="Max Radius"
                  form={true}
                  size="lg"
                />

                <Button
                  title={"Update Location"}
                  type="submit"
                  isFullWidth={true}
                  size="lg"
                  loading={lLoading}
                  Icon={FaMapMarkerAlt}
                  color="color2"
                />
              </div>
            </form>
          }
          onClose={() => setIOpen(false)}
        />
      </div>
    </div>
  );
};

export default Branch;
