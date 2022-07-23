import axios from "axios";
import {
  CREATE_SCHEDULE_FAIL,
  CREATE_SCHEDULE_REQUEST,
  CREATE_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAIL,
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAIL,
  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_FAIL,
  DELETE_SCHEDULE_REQUEST,
  DELETE_SCHEDULE_SUCCESS,
  // DUB_SCHEDULE_FAIL,
  // DUB_SCHEDULE_REQUEST,
  // DUB_SCHEDULE_SUCCESS,
} from "../constants/scheduleConstants";
import { BASE_URL } from "../config";

export const createSchedule = (client, month) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_SCHEDULE_REQUEST });

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
      `${BASE_URL}/schedule/`,
      {
        client,
        month,
      },
      config
    );
    dispatch({
      type: CREATE_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const duplicateSchedule =
  (client, month) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_SCHEDULE_REQUEST });

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
        `${BASE_URL}/schedule/`,
        {
          client,
          month,
        },
        config
      );
      dispatch({
        type: CREATE_SCHEDULE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_SCHEDULE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchSchedule = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SCHEDULE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/schedule/`, config);
    dispatch({
      type: GET_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const patchSchedule =
  (id, client, month) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_SCHEDULE_REQUEST });

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
        `${BASE_URL}/schedule/${id}/`,
        {
          client,
          month,
        },
        config
      );
      dispatch({
        type: UPDATE_SCHEDULE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SCHEDULE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteSchedule = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_SCHEDULE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.delete(`${BASE_URL}/schedule/${id}/`, config);
    dispatch({
      type: DELETE_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
