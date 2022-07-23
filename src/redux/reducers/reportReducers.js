import {
  CREATE_REPORT_FAIL,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_RESET,
  CREATE_REPORT_SUCCESS,
  GET_REPORT_FAIL,
  GET_REPORT_REQUEST,
  GET_REPORT_RESET,
  GET_REPORT_SUCCESS,
  UPDATE_REPORT_FAIL,
  UPDATE_REPORT_REQUEST,
  UPDATE_REPORT_RESET,
  UPDATE_REPORT_SUCCESS,
  DELETE_REPORT_FAIL,
  DELETE_REPORT_REQUEST,
  DELETE_REPORT_RESET,
  DELETE_REPORT_SUCCESS,
  GEN_REPORT_FAIL,
  GEN_REPORT_REQUEST,
  GEN_REPORT_RESET,
  GEN_REPORT_SUCCESS,
} from "../constants/reportConstants";

export const addReportReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REPORT_REQUEST:
      return { loading: true };
    case CREATE_REPORT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_REPORT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_REPORT_RESET:
      return {};
    default:
      return state;
  }
};

export const getReportReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REPORT_REQUEST:
      return { loading: true };
    case GET_REPORT_SUCCESS:
      return {
        loading: false,
        success: true,
        allReports: action.payload.results,
      };
    case GET_REPORT_FAIL:
      return { loading: false, error: action.payload };
    case GET_REPORT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateReportReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REPORT_REQUEST:
      return { loading: true };
    case UPDATE_REPORT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_REPORT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_REPORT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteReportReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REPORT_REQUEST:
      return { loading: true };
    case DELETE_REPORT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_REPORT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_REPORT_RESET:
      return {};
    default:
      return state;
  }
};

export const genReportReducer = (state = {}, action) => {
  switch (action.type) {
    case GEN_REPORT_REQUEST:
      return { loading: true };
    case GEN_REPORT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case GEN_REPORT_FAIL:
      return { loading: false, error: action.payload };
    case GEN_REPORT_RESET:
      return {};
    default:
      return state;
  }
};
