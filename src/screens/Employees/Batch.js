import React, { useState, useEffect } from "react";
import { Header, Navigation, FileUpload, Button } from "../../components";
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
import * as XLSX from "xlsx";
import swal from "sweetalert";
import excel from "../../assets/excel.png";
import { BiUpload, BiDownload } from "react-icons/bi";
import MaterialTable from "material-table";

const BatchEmployee = () => {
  // Helpers
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const columns = [
    { title: "Firstname", field: "Firstname" },
    { title: "Lastname", field: "Lastname" },
    { title: "Username", field: "Username" },
    { title: "Email", field: "Email" },
    { title: "EmployeeID", field: "EmployeeID" },
    { title: "Role", field: "Role" },
    { title: "Date Of Birth", field: "DateOfBirth" },
    { title: "Address", field: "Address" },
    { title: "Province", field: "Province" },
    { title: "Country", field: "Country" },
    { title: "Postal Code", field: "PostalCode" },
    { title: "Hobbies", field: "Hobbies" },
    { title: "JoinDate", field: "JoinDate" },
    { title: "Phone", field: "Phone" },
  ];

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

  const [upload, setUpload] = useState(false);
  const [info, setInfo] = useState(false);

  const [data, setData] = useState([]);

  // const branch = branches[0].id
  const branch = null;
  const department = null;
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
      if (
        data[i]["Firstname"] &&
        data[i]["Username"] &&
        data[i]["Lastname"] &&
        data[i]["Email"] &&
        data[i]["EmployeeID"] &&
        data[i]["Phone"]
      ) {
        let first_name = data[i]["Firstname"];
        let last_name = data[i]["Lastname"];
        let username = data[i]["Username"];
        let email = data[i]["Email"];
        let employee_id = data[i]["EmployeeID"];
        let role = data[i]["Role"];
        let date_of_birth = data[i]["DateOfBirth"];
        let address = data[i]["Address"];
        let province = data[i]["Province"];
        let country = data[i]["Country"];
        let postal_code = data[i]["PostalCode"];
        let hobbies = data[i]["Hobbies"];
        let join_date = data[i]["JoinDate"];
        let phone = data[i]["Phone"];

        const user = {
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
            join_date,
            phone
          )
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
        <Header pageTitle="Employee Batch Upload" />
        <div className={styles.company}>
          <div className={styles.branch}>
            <div className="btnContainer">
              <Link to="/app/employees" className="btnSM color1">
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
                    href="https://hrtechleft.herokuapp.com/EmployeeBatchTemp.xlsx"
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

export default BatchEmployee;
