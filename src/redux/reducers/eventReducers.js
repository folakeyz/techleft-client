import {
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_RESET,
  CREATE_EVENT_SUCCESS,
  GET_EVENT_FAIL,
  GET_EVENT_REQUEST,
  GET_EVENT_RESET,
  GET_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_RESET,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_RESET,
  DELETE_EVENT_SUCCESS,
  PUBLISH_EVENT_FAIL,
  PUBLISH_EVENT_REQUEST,
  PUBLISH_EVENT_RESET,
  PUBLISH_EVENT_SUCCESS,
  GET_ALL_EVENT_FAIL,
  GET_ALL_EVENT_REQUEST,
  GET_ALL_EVENT_RESET,
  GET_ALL_EVENT_SUCCESS,
} from "../constants/eventConstants";

export const addEventReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return { loading: true };
    case CREATE_EVENT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_EVENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getEventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT_REQUEST:
      return { loading: true };
    case GET_EVENT_SUCCESS:
      return {
        loading: false,
        success: true,
        events: action.payload.results,
      };
    case GET_EVENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_EVENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllEventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EVENT_REQUEST:
      return { loading: true };
    case GET_ALL_EVENT_SUCCESS:
      return {
        loading: false,
        success: true,
        events: action.payload.results,
      };
    case GET_ALL_EVENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EVENT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateEventReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EVENT_REQUEST:
      return { loading: true };
    case UPDATE_EVENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_EVENT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteEventReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EVENT_REQUEST:
      return { loading: true };
    case DELETE_EVENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_EVENT_RESET:
      return {};
    default:
      return state;
  }
};

export const publishEventReducer = (state = {}, action) => {
  switch (action.type) {
    case PUBLISH_EVENT_REQUEST:
      return { loading: true };
    case PUBLISH_EVENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PUBLISH_EVENT_FAIL:
      return { loading: false, error: action.payload };
    case PUBLISH_EVENT_RESET:
      return {};
    default:
      return state;
  }
};
