import {
  CREATE_BRANCH_FAIL,
  CREATE_BRANCH_REQUEST,
  CREATE_BRANCH_RESET,
  CREATE_BRANCH_SUCCESS,
  GET_BRANCH_FAIL,
  GET_BRANCH_REQUEST,
  GET_BRANCH_RESET,
  GET_BRANCH_SUCCESS,
  UPDATE_BRANCH_FAIL,
  UPDATE_BRANCH_REQUEST,
  UPDATE_BRANCH_RESET,
  UPDATE_BRANCH_SUCCESS,
  DELETE_BRANCH_FAIL,
  DELETE_BRANCH_REQUEST,
  DELETE_BRANCH_RESET,
  DELETE_BRANCH_SUCCESS,
} from "../constants/branchConstants";

export const addBranchReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BRANCH_REQUEST:
      return { loading: true };
    case CREATE_BRANCH_SUCCESS:
      return { loading: false, success: true };
    case CREATE_BRANCH_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_BRANCH_RESET:
      return {};
    default:
      return state;
  }
};

export const getBranchReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BRANCH_REQUEST:
      return { loading: true };
    case GET_BRANCH_SUCCESS:
      return {
        loading: false,
        success: true,
        branches: action.payload.results,
      };
    case GET_BRANCH_FAIL:
      return { loading: false, error: action.payload };
    case GET_BRANCH_RESET:
      return {};
    default:
      return state;
  }
};

export const updateBranchReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BRANCH_REQUEST:
      return { loading: true };
    case UPDATE_BRANCH_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_BRANCH_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_BRANCH_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteBranchReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BRANCH_REQUEST:
      return { loading: true };
    case DELETE_BRANCH_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_BRANCH_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_BRANCH_RESET:
      return {};
    default:
      return state;
  }
};
