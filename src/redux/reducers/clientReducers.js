import {
  CREATE_CLIENT_FAIL,
  CREATE_CLIENT_REQUEST,
  CREATE_CLIENT_RESET,
  CREATE_CLIENT_SUCCESS,
  GET_CLIENT_FAIL,
  GET_CLIENT_REQUEST,
  GET_CLIENT_RESET,
  GET_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_RESET,
  UPDATE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_RESET,
  DELETE_CLIENT_SUCCESS,
  GET_SINGLE_CLIENT_FAIL,
  GET_SINGLE_CLIENT_REQUEST,
  GET_SINGLE_CLIENT_RESET,
  GET_SINGLE_CLIENT_SUCCESS,
  ASSIGN_ECLIENT_FAIL,
  ASSIGN_ECLIENT_REQUEST,
  ASSIGN_ECLIENT_RESET,
  ASSIGN_ECLIENT_SUCCESS,
  REMOVE_ECLIENT_FAIL,
  REMOVE_ECLIENT_REQUEST,
  REMOVE_ECLIENT_RESET,
  REMOVE_ECLIENT_SUCCESS,
} from "../constants/clientConstants";

export const addClientReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CLIENT_REQUEST:
      return { loading: true };
    case CREATE_CLIENT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_CLIENT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_CLIENT_RESET:
      return {};
    default:
      return state;
  }
};

export const addEClientReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGN_ECLIENT_REQUEST:
      return { loading: true };
    case ASSIGN_ECLIENT_SUCCESS:
      return { loading: false, success: true };
    case ASSIGN_ECLIENT_FAIL:
      return { loading: false, error: action.payload };
    case ASSIGN_ECLIENT_RESET:
      return {};
    default:
      return state;
  }
};

export const removeEClientReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_ECLIENT_REQUEST:
      return { loading: true };
    case REMOVE_ECLIENT_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_ECLIENT_FAIL:
      return { loading: false, error: action.payload };
    case REMOVE_ECLIENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getClientReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CLIENT_REQUEST:
      return { loading: true };
    case GET_CLIENT_SUCCESS:
      return {
        loading: false,
        success: true,
        clients: action.payload.results,
      };
    case GET_CLIENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_CLIENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleClientReducer = (state = { emp: [] }, action) => {
  switch (action.type) {
    case GET_SINGLE_CLIENT_REQUEST:
      return { loading: true };
    case GET_SINGLE_CLIENT_SUCCESS:
      return {
        loading: false,
        success: true,
        client: action.payload,
        emp: action.payload.employees,
      };
    case GET_SINGLE_CLIENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_CLIENT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateClientReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CLIENT_REQUEST:
      return { loading: true };
    case UPDATE_CLIENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_CLIENT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_CLIENT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteClientReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CLIENT_REQUEST:
      return { loading: true };
    case DELETE_CLIENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_CLIENT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_CLIENT_RESET:
      return {};
    default:
      return state;
  }
};
