import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allUserReducer,
  authReducer,
  forgotPasswordReducer,
  getMeReducer,
  resetPasswordReducer,
  updateMeReducer,
  userRegReducer,
  userDemoReducer,
  JoinReducer
} from "./reducers/userReducers";
import {
  addCompanyReducer,
  getCompanyReducer,
  updateCompanyReducer,
} from "./reducers/companyReducers";
import {
  addBranchReducer,
  deleteBranchReducer,
  getBranchReducer,
  updateBranchReducer,
} from "./reducers/branchReducers";
import {
  addDepartmentReducer,
  deleteDepartmentReducer,
  getDepartmentReducer,
  updateDepartmentReducer,
} from "./reducers/departmentReducers";
import {
  addClientReducer,
  addEClientReducer,
  deleteClientReducer,
  getClientReducer,
  getSingleClientReducer,
  removeEClientReducer,
  updateClientReducer,
} from "./reducers/clientReducers";
import {
  addEmployeeReducer,
  deleteEmployeeReducer,
  getEmployeeReducer,
  inviteEmployeeReducer,
  updateEmployeeReducer,
} from "./reducers/employeeReducers";

import {
  addScheduleReducer,
  deleteScheduleReducer,
  dubScheduleReducer,
  getScheduleReducer,
  updateScheduleReducer,
} from "./reducers/scheduleReducers";

import {
  addLocationReducer,
  deleteLocationReducer,
  getLocationReducer,
  updateLocationReducer,
} from "./reducers/locationReducers";
import {
  addRotaReducer,
  deleteRotaReducer,
  getRotaReducer,
  updateRotaReducer,
} from "./reducers/rotaReducers";
import {
  addEventReducer,
  deleteEventReducer,
  getAllEventReducer,
  getEventReducer,
  publishEventReducer,
  updateEventReducer,
} from "./reducers/eventReducers";

import {
  addReportReducer,
  deleteReportReducer,
  genReportReducer,
  getReportReducer,
  updateReportReducer,
} from "./reducers/reportReducers";

const reducer = combineReducers({
  userLogin: authReducer,
  userForgot: forgotPasswordReducer,
  userReset: resetPasswordReducer,
  userRegister: userRegReducer,
  userDemo: userDemoReducer,
  userJoin: JoinReducer,
  userProfile: getMeReducer,
  updateUser: updateMeReducer,
  allUser: allUserReducer,
  addCompany: addCompanyReducer,
  getCompany: getCompanyReducer,
  updateCompany: updateCompanyReducer,

  addBranch: addBranchReducer,
  getBranch: getBranchReducer,
  removeBranch: deleteBranchReducer,
  updateBranch: updateBranchReducer,
  addDepartment: addDepartmentReducer,
  getDepartment: getDepartmentReducer,
  removeDepartment: deleteDepartmentReducer,
  updateDepartment: updateDepartmentReducer,
  addClient: addClientReducer,
  addEClient: addEClientReducer,
  reomoveEClient: removeEClientReducer,
  getClient: getClientReducer,
  singleClient: getSingleClientReducer,
  removeClient: deleteClientReducer,
  updateClient: updateClientReducer,
  addEmployee: addEmployeeReducer,
  getEmployee: getEmployeeReducer,
  removeEmployee: deleteEmployeeReducer,
  updateEmployee: updateEmployeeReducer,
  invitation: inviteEmployeeReducer,
  addSchedule: addScheduleReducer,
  getSchedule: getScheduleReducer,
  removeSchedule: deleteScheduleReducer,
  updateSchedule: updateScheduleReducer,
  dubSchedule: dubScheduleReducer,
  addLocation: addLocationReducer,
  getLocation: getLocationReducer,
  removeLocation: deleteLocationReducer,
  updateLocation: updateLocationReducer,
  addRota: addRotaReducer,
  getRota: getRotaReducer,
  removeRota: deleteRotaReducer,
  updateRota: updateRotaReducer,
  addEvent: addEventReducer,
  getEvent: getEventReducer,
  getAllEvent: getAllEventReducer,
  removeEvent: deleteEventReducer,
  updateEvent: updateEventReducer,
  publishEvent: publishEventReducer,
  addReport: addReportReducer,
  getReport: getReportReducer,
  removeReport: deleteReportReducer,
  updateReport: updateReportReducer,
  generateReport: genReportReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
