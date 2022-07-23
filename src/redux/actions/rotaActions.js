import axios from "axios";
import {
  CREATE_ROTA_FAIL,
  CREATE_ROTA_REQUEST,
  CREATE_ROTA_SUCCESS,
  GET_ROTA_FAIL,
  GET_ROTA_REQUEST,
  GET_ROTA_SUCCESS,
  UPDATE_ROTA_FAIL,
  UPDATE_ROTA_REQUEST,
  UPDATE_ROTA_SUCCESS,
  DELETE_ROTA_FAIL,
  DELETE_ROTA_REQUEST,
  DELETE_ROTA_SUCCESS,
} from "../constants/rotaConstants";
import { BASE_URL } from "../config";

export const createRota =
  (month, year, index) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_ROTA_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/month/`,
        {
          month,
          year,
          index,
        },
        config
      );
      dispatch({
        type: CREATE_ROTA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ROTA_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchRota = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ROTA_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/month/`, config);
    dispatch({
      type: GET_ROTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ROTA_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const patchRota =
  (id, month, year, index) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_ROTA_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/month/${id}/`,
        {
          month,
          year,
          index,
        },
        config
      );
      dispatch({
        type: UPDATE_ROTA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ROTA_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteRota = (ids) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ROTA_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.delete(`${BASE_URL}/month/${ids}/`, config);
    dispatch({
      type: DELETE_ROTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ROTA_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
