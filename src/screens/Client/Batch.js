import React, { useState, useEffect } from "react";
import { Header, Navigation, FileUpload, Button } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import { CREATE_CLIENT_RESET } from "../../redux/constants/clientConstants";
import { getMyCompany } from "../../redux/actions/companyActions";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import swal from "sweetalert";
import excel from "../../assets/excel.png";
import { BiUpload, BiDownload } from "react-icons/bi";
import MaterialTable from "material-table";
import { createClient } from "../../redux/actions/clientActions";

const BatchClient = () => {
  // Helpers
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const columns = [
    { title: "Name", field: "Name" },
    { title: "Email", field: "Email" },
    { title: "Phone", field: "Phone" },
    { title: "Address", field: "Address" },
    { title: "Province", field: "Province" },
    { title: "Country", field: "Country" },
    { title: "Postal Code", field: "PostalCode" },
    { title: "JoinDate", field: "JoinDate" },
  ];

  const addClient = useSelector((state) => state.addClient);
  const { loading, error, success } = addClient;

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany = [] } = getCompany;
  const company = myCompany[0] ? myCompany[0].id : "";

  const [upload, setUpload] = useState(false);
  const [info, setInfo] = useState(false);

  const [data, setData] = useState([]);

  // const branch = branches[0].id
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

  if (success) {
    toast({
      title: "Notification",
      description: "Client added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    navigate("/app/client");
    dispatch({ type: CREATE_CLIENT_RESET });
  }

  useEffect(() => {
    dispatch(getMyCompany());
  }, [dispatch]);

  const uploadHandler = (e) => {
    var files = e.target.files,
      f = files[0];
    var allowedExtensions =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      "application/vnd.ms-excel" ||
      ".csv";
    if (f.type !== allowedExtensions) {
      swal("Warning!", "Invalid File", "warning");
    } else {
      var reader = new FileReader();
      reader.onload = function (e) {
        setUpload(true);
        var data = reader.result;
        let readedData = XLSX.read(data, { type: "binary" });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];
        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws);
        if (dataParse.length === 0) {
          setUpload(false);
          swal("Warning!", "Document is empty", "warning");
        } else {
          setUpload(false);
          setData(dataParse);
          setInfo(true);
        }
      };
      reader.readAsBinaryString(f);
      // history.push("/newclaim/screen/2")
    }
  };

  const submitHandler = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i]["Name"] && data[i]["Email"] && data[i]["Phone"]) {
        let name = data[i]["Name"];
        let email = data[i]["Email"];
        let address = data[i]["Address"];
        let province = data[i]["Province"];
        let country = data[i]["Country"];
        let postal_code = data[i]["PostalCode"];
        let join_date = data[i]["JoinDate"];
        let phone = data[i]["Phone"];

        createClient(
          company,
          name,
          email,
          phone,
          address,
          province,
          country,
          postal_code,
          join_date
        );
      }
    }
  };

  const cancel = () => {
    setInfo(false);
  };
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Client Batch Upload" />
        <div className={styles.company}>
          <div className={styles.branch}>
            <div className="btnContainer">
              <Link to="/app/client" className="btnSM color1">
                Go Back
              </Link>
            </div>

            <div className="formPadding">
              <>
                <h4>
                  <b>
                    <u>Guidelines</u>
                  </b>
                </h4>
                <p>
                  1. Click on the Download button on the top right to download a
                  template
                </p>
                <p>2. Upload only .xlsx file </p>
                <p>3. All Required fields are higligted in red </p>
                <p>3. Date Format YYYY-MM-DD [2022-10-02]</p>
                <div className="btnContainer">
                  <a
                    className="btn color2"
                    href="https://hrtechleft.herokuapp.com/ClientBatchTemp.xlsx"
                    download
                  >
                    Download Template &nbsp; <BiDownload />
                  </a>
                </div>
              </>

              {info && (
                <>
                  <MaterialTable
                    title=""
                    columns={columns}
                    data={data}
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
                  />
                  <Button
                    title={"Upload"}
                    type="button"
                    color="yellow"
                    loading={loading}
                    isFullWidth={true}
                    onClick={submitHandler}
                  />
                  <Button
                    title={"Upload"}
                    type="button"
                    color="color2"
                    onClick={cancel}
                  />
                </>
              )}
              <div className={styles.uploadContainer}>
                <div className={styles.uploadCircle}>
                  <BiUpload />
                </div>

                {upload ? (
                  <Center>
                    <CircularProgress isIndeterminate color="green" />
                  </Center>
                ) : (
                  <FileUpload
                    title="Select File to Upload"
                    onChange={uploadHandler}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchClient;
