import {
  USER_AUTH_FAIL,
  USER_AUTH_REQUEST,
  USER_AUTH_RESET,
  USER_AUTH_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_RESET,
  CREATE_ACCOUNT_SUCCESS,
  GET_ME_FAIL,
  GET_ME_REQUEST,
  GET_ME_RESET,
  GET_ME_SUCCESS,
  UPDATE_ME_FAIL,
  UPDATE_ME_REQUEST,
  UPDATE_ME_RESET,
  UPDATE_ME_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_RESET,
  GET_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_RESET,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_SUCCESS,
  DEMO_FAIL,DEMO_REQUEST,DEMO_RESET,DEMO_SUCCESS,
  JOIN_FAIL,JOIN_REQUEST,JOIN_RESET,JOIN_SUCCESS,
} from "../constants/userConstants";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_AUTH_REQUEST:
      return { loading: true };
    case USER_AUTH_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_AUTH_FAIL:
      return { loading: false, error: action.payload };
    case USER_AUTH_RESET:
      return {};
    default:
      return state;
  }
};

export const userRegReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST:
      return { loading: true };
    case CREATE_ACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_ACCOUNT_RESET:
      return {};
    default:
      return state;
  }
};
export const userDemoReducer = (state = {}, action) => {
  switch (action.type) {
    case DEMO_REQUEST:
      return { loading: true };
    case DEMO_SUCCESS:
      return { loading: false, success: true };
    case DEMO_FAIL:
      return { loading: false, error: action.payload };
    case DEMO_RESET:
      return {};
    default:
      return state;
  }
};

export const JoinReducer = (state = {}, action) => {
  switch (action.type) {
    case JOIN_REQUEST:
      return { loading: true };
    case JOIN_SUCCESS:
      return { loading: false, success: true };
    case JOIN_FAIL:
      return { loading: false, error: action.payload };
    case JOIN_RESET:
      return {};
    default:
      return state;
  }
};

export const getMeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ME_REQUEST:
      return { loading: true };
    case GET_ME_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case GET_ME_FAIL:
      return { loading: false, error: action.payload };
    case GET_ME_RESET:
      return {};
    default:
      return state;
  }
};

export const updateMeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ME_REQUEST:
      return { loading: true };
    case UPDATE_ME_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case UPDATE_ME_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ME_RESET:
      return {};
    default:
      return state;
  }
};

export const allUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true };
    case GET_USER_SUCCESS:
      return { loading: false, success: true, users: action.payload };
    case GET_USER_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case FORGOT_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
