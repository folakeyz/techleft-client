import {
  CREATE_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_RESET,
  CREATE_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAIL,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_RESET,
  GET_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_RESET,
  UPDATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_RESET,
  DELETE_EMPLOYEE_SUCCESS,
  SEND_INVITE_FAIL,
  SEND_INVITE_REQUEST,
  SEND_INVITE_RESET,
  SEND_INVITE_SUCCESS,
} from "../constants/employeeConstants";

export const addEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_REQUEST:
      return { loading: true };
    case CREATE_EMPLOYEE_SUCCESS:
      return { loading: false, success: true };
    case CREATE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_EMPLOYEE_RESET:
      return {};
    default:
      return state;
  }
};

export const getEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_REQUEST:
      return { loading: true };
    case GET_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: true,
        employees: action.payload.results,
      };
    case GET_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case GET_EMPLOYEE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EMPLOYEE_REQUEST:
      return { loading: true };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_EMPLOYEE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
      return { loading: true };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_EMPLOYEE_RESET:
      return {};
    default:
      return state;
  }
};

export const inviteEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_INVITE_REQUEST:
      return { loading: true };
    case SEND_INVITE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SEND_INVITE_FAIL:
      return { loading: false, error: action.payload };
    case SEND_INVITE_RESET:
      return {};
    default:
      return state;
  }
};
