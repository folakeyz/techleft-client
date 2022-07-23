import axios from "axios";
import {
  CREATE_REPORT_FAIL,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  GET_REPORT_FAIL,
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  UPDATE_REPORT_FAIL,
  UPDATE_REPORT_REQUEST,
  UPDATE_REPORT_SUCCESS,
  DELETE_REPORT_FAIL,
  DELETE_REPORT_REQUEST,
  DELETE_REPORT_SUCCESS,
  GEN_REPORT_FAIL,
  GEN_REPORT_REQUEST,
  GEN_REPORT_SUCCESS,
} from "../constants/reportConstants";
import { BASE_URL } from "../config";

export const createWeek =
  (name, start_date, end_date, report_deadline) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_REPORT_REQUEST });

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
        `${BASE_URL}/week/`,
        {
          name,
          start_date,
          end_date,
          report_deadline,
        },
        config
      );
      dispatch({
        type: CREATE_REPORT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_REPORT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchWeek = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REPORT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/week/`, config);
    dispatch({
      type: GET_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_REPORT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const patchWeek =
  (id, name, start_date, end_date, report_deadline) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_REPORT_REQUEST });

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
        `${BASE_URL}/week/${id}/`,
        {
          name,
          start_date,
          end_date,
          report_deadline,
        },
        config
      );
      dispatch({
        type: UPDATE_REPORT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_REPORT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteWeek = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_REPORT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.delete(`${BASE_URL}/week/${id}/`, config);
    dispatch({
      type: DELETE_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REPORT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const genReport = (weeks) => async (dispatch, getState) => {
  try {
    dispatch({ type: GEN_REPORT_REQUEST });

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
      `${BASE_URL}/week/report`,
      {
        weeks,
      },
      config
    );
    dispatch({
      type: GEN_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GEN_REPORT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
