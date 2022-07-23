import {
  CREATE_SCHEDULE_FAIL,
  CREATE_SCHEDULE_REQUEST,
  CREATE_SCHEDULE_RESET,
  CREATE_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAIL,
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_RESET,
  GET_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAIL,
  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_RESET,
  UPDATE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_FAIL,
  DELETE_SCHEDULE_REQUEST,
  DELETE_SCHEDULE_RESET,
  DELETE_SCHEDULE_SUCCESS,
  DUB_SCHEDULE_FAIL,
  DUB_SCHEDULE_REQUEST,
  DUB_SCHEDULE_RESET,
  DUB_SCHEDULE_SUCCESS,
} from "../constants/scheduleConstants";

export const addScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SCHEDULE_REQUEST:
      return { loading: true };
    case CREATE_SCHEDULE_SUCCESS:
      return { loading: false, success: true };
    case CREATE_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

export const dubScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case DUB_SCHEDULE_REQUEST:
      return { loading: true };
    case DUB_SCHEDULE_SUCCESS:
      return { loading: false, success: true };
    case DUB_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case DUB_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

export const getScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SCHEDULE_REQUEST:
      return { loading: true };
    case GET_SCHEDULE_SUCCESS:
      return {
        loading: false,
        success: true,
        schedules: action.payload.results,
      };
    case GET_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SCHEDULE_REQUEST:
      return { loading: true };
    case UPDATE_SCHEDULE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SCHEDULE_REQUEST:
      return { loading: true };
    case DELETE_SCHEDULE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};
