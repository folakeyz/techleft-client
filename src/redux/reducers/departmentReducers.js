import {
  CREATE_DEPARTMENT_FAIL,
  CREATE_DEPARTMENT_REQUEST,
  CREATE_DEPARTMENT_RESET,
  CREATE_DEPARTMENT_SUCCESS,
  GET_DEPARTMENT_FAIL,
  GET_DEPARTMENT_REQUEST,
  GET_DEPARTMENT_RESET,
  GET_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_FAIL,
  UPDATE_DEPARTMENT_REQUEST,
  UPDATE_DEPARTMENT_RESET,
  UPDATE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_FAIL,
  DELETE_DEPARTMENT_REQUEST,
  DELETE_DEPARTMENT_RESET,
  DELETE_DEPARTMENT_SUCCESS,
} from "../constants/departmentConstants";

export const addDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DEPARTMENT_REQUEST:
      return { loading: true };
    case CREATE_DEPARTMENT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_DEPARTMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEPARTMENT_REQUEST:
      return { loading: true };
    case GET_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        departments: action.payload.results,
      };
    case GET_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_DEPARTMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DEPARTMENT_REQUEST:
      return { loading: true };
    case UPDATE_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_DEPARTMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DEPARTMENT_REQUEST:
      return { loading: true };
    case DELETE_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_DEPARTMENT_RESET:
      return {};
    default:
      return state;
  }
};
