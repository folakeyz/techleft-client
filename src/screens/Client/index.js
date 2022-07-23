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
  DateInput,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import {
  deleteClient,
  fetchClient,
  patchClient,
} from "../../redux/actions/clientActions";
import {
  DELETE_CLIENT_RESET,
  GET_CLIENT_RESET,
  UPDATE_CLIENT_RESET,
} from "../../redux/constants/clientConstants";
import MaterialTable from "material-table";
import { getMyCompany } from "../../redux/actions/companyActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { FaCogs, FaPlusCircle, FaTrash, FaWrench } from "react-icons/fa";

const Client = () => {
  const navigate = useNavigate();
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

  const getClient = useSelector((state) => state.getClient);
  const { loading: gLoading, error: gError, clients } = getClient;

  const updateClient = useSelector((state) => state.updateClient);
  const { loading: uLoading, error: uError, success: uSuccess } = updateClient;

  const removeClient = useSelector((state) => state.removeClient);
  const { loading: rLoading, error: rError, success: rSuccess } = removeClient;

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany = [] } = getCompany;
  const company = myCompany[0] ? myCompany[0].id : "";

  const [open, setOpen] = useState(false);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [join_date, setJoinDate] = useState("");

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
    dispatch(fetchClient());
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
    dispatch(fetchClient());
    dispatch({ type: DELETE_CLIENT_RESET });
  }

  useEffect(() => {
    dispatch(fetchClient());
    dispatch(getMyCompany());
  }, [dispatch]);

  const editHandler = (e) => {
    e.preventDefault();
    dispatch(
      patchClient(
        id,
        company,
        name,
        email,
        phone,
        address,
        province,
        country,
        postal_code,
        join_date
      )
    );
  };

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Client",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteClient(id));
      }
    });
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Client" />
        <div className={styles.company}>
          {rLoading || gLoading ? (
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          ) : (
            <div className={styles.branch}>
              <div className="btnContainer right">
                <Link to="/app/client/add" className="btnSM color2">
                  <FaPlusCircle /> &nbsp; Add Client
                </Link>
              </div>
              <MaterialTable
                title=""
                columns={columns}
                data={clients}
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
                      navigate(`/app/client/${rowData.id}`);
                    },
                    title: "Manage",
                    color: "color2",
                    Icon: FaCogs,
                  },
                  {
                    icon: "launch",
                    iconProps: { style: { fontSize: "15px", color: "gold" } },
                    tooltip: "Edit",
                    onClick: (event, rowData) => {
                      setOpen(true);
                      setName(rowData.name);
                      setEmail(rowData.email);
                      setAddress(rowData.address);
                      setPostalCode(rowData.postal_code);
                      setCountry(rowData.country);
                      setPhone(rowData.phone);
                      setAddress(rowData.address);
                      setProvince(rowData.province);
                      setJoinDate(rowData.join_date);
                      setID(rowData.id);
                    },
                    title: "Edit",
                    color: "yellow",
                    Icon: FaWrench,
                  },
                  {
                    icon: "launch",
                    iconProps: { style: { fontSize: "15px", color: "gold" } },
                    tooltip: "Delete",
                    onClick: (event, rowData) => {
                      deleteHandler(rowData.id);
                    },
                    title: "Delete",
                    color: "color3",
                    Icon: FaTrash,
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
          title={"Edit Client"}
          size="lg"
          content={
            <form>
              <div className="test__InputFlex">
                {uLoading ? (
                  <Center>
                    <CircularProgress isIndeterminate color="#087E8C" />
                  </Center>
                ) : (
                  <>
                    <Input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required={true}
                      title="Client Name"
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

                    <Select
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                      title="Country"
                      options={Options.countries}
                      required={true}
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
                      required={true}
                      form={true}
                    />

                    <Button
                      title={"Edit Client"}
                      onClick={editHandler}
                      type="button"
                      color="color2"
                      isFullWidth={true}
                      loading={uLoading}
                    />
                  </>
                )}
              </div>
            </form>
          }
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default Client;
