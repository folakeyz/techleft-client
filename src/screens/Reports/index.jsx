import React, { useState, useEffect } from "react";
import {
    Header,
    Navigation,
    Input,
    Button,
    DateInput,
    Modal,
    MenuBar,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import {
    createWeek,
    deleteWeek,
    fetchWeek,
    genReport,
    patchWeek,
} from "../../redux/actions/reportActions";
import {
    CREATE_REPORT_RESET,
    DELETE_REPORT_RESET,
    GEN_REPORT_RESET,
    GET_REPORT_RESET,
    UPDATE_REPORT_RESET,
} from "../../redux/constants/reportConstants";
import MaterialTable from "material-table";
import { getMyCompany } from "../../redux/actions/companyActions";
import { FaPlusCircle, FaWrench, FaTrashAlt, FaPrint } from "react-icons/fa";
import swal from "sweetalert";

const Reports = () => {
    //Table data
    const columns = [
        { title: "Name", field: "name" },
        { title: "Start Date", field: "start_date" },
        { title: "End Date", field: "end_date" },
        { title: "Deadline", field: "report_deadline" },
    ];

    // Helpers
    const dispatch = useDispatch();
    const toast = useToast();

    const addReport = useSelector((state) => state.addReport);
    const { loading, error, success } = addReport;

    const generateReport = useSelector((state) => state.generateReport);
    const { loading: geLoading, error: geError, success: geSuccess } = generateReport;


    const getReport = useSelector((state) => state.getReport);
    const { loading: gLoading, error: gError, allReports } = getReport;

    const updateReport = useSelector((state) => state.updateReport);
    const { loading: uLoading, error: uError, success: uSuccess } = updateReport;

    const removeReport = useSelector((state) => state.removeReport);
    const { loading: rLoading, error: rError, success: rSuccess } = removeReport;

    // const getCompany = useSelector((state) => state.getCompany);
    // const { myCompany = [] } = getCompany;
    // const company = myCompany[0] ? myCompany[0].id : "";

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [date, setDate] = useState("");
    const [report_deadline, setReport_deadline] = useState("");

    const deadlineHandler = (e) => {
        setDate(e.target.value)
        const date1 = new Date(end_date);
        const date2 = new Date(e.target.value);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setReport_deadline(diffDays)
        console.log(e.target.value)
        console.log(diffDays)
    }

    if (error) {
        toast({
            title: "Error",
            description: error,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
        });
        dispatch({ type: CREATE_REPORT_RESET });
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
        dispatch({ type: GET_REPORT_RESET });
    }
    if (success) {
        toast({
            title: "Notification",
            description: "Week added Successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
        });
        setOpen(false);
        dispatch(fetchWeek());
        dispatch({ type: CREATE_REPORT_RESET });
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
        dispatch({ type: UPDATE_REPORT_RESET });
    }
    if (uSuccess) {
        toast({
            title: "Notification",
            description: "Week updated Successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
        });
        setOpen(false);
        setEdit(false);
        dispatch(fetchWeek());
        dispatch({ type: UPDATE_REPORT_RESET });
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
        dispatch({ type: DELETE_REPORT_RESET });
    }
    if (rSuccess) {
        toast({
            title: "Notification",
            description: "Week deleted Successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
        });
        dispatch(fetchWeek());
        dispatch({ type: DELETE_REPORT_RESET });
    }

    useEffect(() => {
        dispatch(fetchWeek());
        dispatch(getMyCompany());
    }, [dispatch]);

    const branchHandler = (e) => {
        e.preventDefault();
        dispatch(
            createWeek(
                name, start_date, end_date, report_deadline
            )
        );
    };
    const editHandler = (e) => {
        e.preventDefault();
        dispatch(
            patchWeek(
                id,
                name, start_date, end_date, report_deadline
            )
        );
    };

    const deleteHandler = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete this ",
            icon: "warning",
            dangerMode: true,
            buttons: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteWeek(id));
            }
        });

    };

    const generateHandler = (id) => {
        const weeks = [id]
        dispatch(genReport(weeks))
    }

    if (geSuccess) {
        toast({
            title: "Notification",
            description: "Report Generated Successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
        });

        dispatch({ type: GEN_REPORT_RESET });
    }

    if (geError) {
        toast({
            title: "Error",
            description: geError,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
        });
        dispatch({ type: GEN_REPORT_RESET });
    }

    // Menubar Items
    const menu = [
        { name: "Month Setup", url: "/app/rota" },
        { name: "Manage Schedule", url: "/app/schedule" },
        { name: "Time Sheet", active: true, url: "/app/reports" },
    ];

    const openHandler = () => {
        setOpen(true)
        setEdit(false)
        setEndDate("")
        setStartDate("")
        setName("")
    }

    return (
        <div className="appContainer">
            <Navigation />
            <div className="contentsRight">
                <Header pageTitle="Reports" />
                <div className={styles.company}>
                    <MenuBar menu={menu} />
                    {geLoading || rLoading || gLoading ? (
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
                                    &nbsp;&nbsp; Add Week
                                </button>
                            </div>

                            <MaterialTable
                                title=""
                                columns={columns}
                                data={allReports}
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
                                        tooltip: "Generate Report",
                                        onClick: (event, rowData) => {
                                            generateHandler(rowData.id)
                                        },
                                        title: "Generate",
                                        color: "blue",
                                        Icon: FaPrint,
                                    },
                                    {
                                        icon: "launch",
                                        iconProps: { style: { fontSize: "20px", color: "gold" } },
                                        tooltip: "Edit",
                                        onClick: (event, rowData) => {
                                            setOpen(true);
                                            setEdit(true);
                                            setName(rowData.name);
                                            setStartDate(rowData.start_date);
                                            setEndDate(rowData.end_date);

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
                                            <props.action.Icon />{props.action.title}
                                        </button>
                                    ),
                                }}
                            />
                        </div>
                    )}
                </div>
                <Modal
                    isVisible={open}
                    title={edit ? "Edit Week" : "Add Week"}
                    size="md"
                    content={
                        <form onSubmit={edit ? editHandler : branchHandler}>

                            <div className="test__InputFlex">
                                <Input
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    required={true}
                                    title="Name"
                                    form={true}
                                    size="lg"
                                    placeholder="E.g. Week 1 or Nurses Week"
                                />
                                <DateInput
                                    type="text"
                                    onChange={(e) => setStartDate(e.target.value)}
                                    value={start_date}
                                    required={true}
                                    title="Start Date"
                                    form={true}
                                    size="lg"
                                />
                                <DateInput
                                    type="text"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    value={end_date}
                                    required={true}
                                    title="End Date"
                                    form={true}
                                    size="lg"
                                />
                                <DateInput
                                    type="text"
                                    onChange={deadlineHandler}
                                    value={date}
                                    required={true}
                                    title="Report Deadline"
                                    form={true}
                                    size="lg"
                                />
                                <Input
                                    type="text"
                                    onChange={null}
                                    value={`${report_deadline} days`}
                                    readOnly={true}
                                    title="Number of Days"
                                    form={true}
                                    size="lg"

                                />

                                <Button
                                    title={edit ? "Edit Week" : "Add Week"}
                                    type="submit"
                                    color="color2"
                                    isFullWidth={true}
                                    size="lg"
                                    loading={uLoading || loading}
                                    Icon={edit ? FaWrench : FaPlusCircle}
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

export default Reports;
