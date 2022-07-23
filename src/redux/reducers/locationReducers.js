import {
  CREATE_LOCATION_FAIL,
  CREATE_LOCATION_REQUEST,
  CREATE_LOCATION_RESET,
  CREATE_LOCATION_SUCCESS,
  GET_LOCATION_FAIL,
  GET_LOCATION_REQUEST,
  GET_LOCATION_RESET,
  GET_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_RESET,
  UPDATE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAIL,
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_RESET,
  DELETE_LOCATION_SUCCESS,
} from "../constants/locationConstants";

export const addLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LOCATION_REQUEST:
      return { loading: true };
    case CREATE_LOCATION_SUCCESS:
      return { loading: false, success: true };
    case CREATE_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_LOCATION_RESET:
      return {};
    default:
      return state;
  }
};

export const getLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOCATION_REQUEST:
      return { loading: true };
    case GET_LOCATION_SUCCESS:
      return {
        loading: false,
        success: true,
        locations: action.payload.results,
      };
    case GET_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_LOCATION_RESET:
      return {};
    default:
      return state;
  }
};

export const updateLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LOCATION_REQUEST:
      return { loading: true };
    case UPDATE_LOCATION_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_LOCATION_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LOCATION_REQUEST:
      return { loading: true };
    case DELETE_LOCATION_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_LOCATION_RESET:
      return {};
    default:
      return state;
  }
};
