import {
  CREATE_COMPANY_FAIL,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_RESET,
  CREATE_COMPANY_SUCCESS,
  GET_COMPANY_FAIL,
  GET_COMPANY_REQUEST,
  GET_COMPANY_RESET,
  GET_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_RESET,
  UPDATE_COMPANY_SUCCESS,
} from "../constants/companyConstants";

export const addCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMPANY_REQUEST:
      return { loading: true };
    case CREATE_COMPANY_SUCCESS:
      return { loading: false, success: true };
    case CREATE_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_COMPANY_RESET:
      return {};
    default:
      return state;
  }
};

export const getCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMPANY_REQUEST:
      return { loading: true };
    case GET_COMPANY_SUCCESS:
      return {
        loading: false,
        success: true,
        myCompany: action.payload.results,
      };
    case GET_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    case GET_COMPANY_RESET:
      return {};
    default:
      return state;
  }
};

export const updateCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COMPANY_REQUEST:
      return { loading: true };
    case UPDATE_COMPANY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_COMPANY_RESET:
      return {};
    default:
      return state;
  }
};
