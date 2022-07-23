import {
  CREATE_ROTA_FAIL,
  CREATE_ROTA_REQUEST,
  CREATE_ROTA_RESET,
  CREATE_ROTA_SUCCESS,
  GET_ROTA_FAIL,
  GET_ROTA_REQUEST,
  GET_ROTA_RESET,
  GET_ROTA_SUCCESS,
  UPDATE_ROTA_FAIL,
  UPDATE_ROTA_REQUEST,
  UPDATE_ROTA_RESET,
  UPDATE_ROTA_SUCCESS,
  DELETE_ROTA_FAIL,
  DELETE_ROTA_REQUEST,
  DELETE_ROTA_RESET,
  DELETE_ROTA_SUCCESS,
} from "../constants/rotaConstants";

export const addRotaReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ROTA_REQUEST:
      return { loading: true };
    case CREATE_ROTA_SUCCESS:
      return { loading: false, success: true, response: action.payload.id };
    case CREATE_ROTA_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_ROTA_RESET:
      return {};
    default:
      return state;
  }
};

export const getRotaReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ROTA_REQUEST:
      return { loading: true };
    case GET_ROTA_SUCCESS:
      return {
        loading: false,
        success: true,
        rotas: action.payload.results,
      };
    case GET_ROTA_FAIL:
      return { loading: false, error: action.payload };
    case GET_ROTA_RESET:
      return {};
    default:
      return state;
  }
};

export const updateRotaReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROTA_REQUEST:
      return { loading: true };
    case UPDATE_ROTA_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_ROTA_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ROTA_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteRotaReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROTA_REQUEST:
      return { loading: true };
    case DELETE_ROTA_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_ROTA_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_ROTA_RESET:
      return {};
    default:
      return state;
  }
};
