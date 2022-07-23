import axios from "axios";
import {
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  GET_EVENT_FAIL,
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  PUBLISH_EVENT_FAIL,
  PUBLISH_EVENT_REQUEST,
  PUBLISH_EVENT_SUCCESS,
  GET_ALL_EVENT_FAIL,
  GET_ALL_EVENT_REQUEST,
  GET_ALL_EVENT_SUCCESS,
} from "../constants/eventConstants";
import { BASE_URL } from "../config";

export const createEvent =
  (company, employee, client, name, start_time, end_time, note, status, date) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_EVENT_REQUEST });

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
        `${BASE_URL}/event/`,
        {
          company,
          employee,
          client,
          name,
          start_time,
          end_time,
          note,
          status,
          date,
        },
        config
      );
      dispatch({
        type: CREATE_EVENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_EVENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchEvent = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_EVENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/event/`, config);
    dispatch({
      type: GET_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EVENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchAllEvent = (monthId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_EVENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(
      `${BASE_URL}/month/${monthId}/events`,
      config
    );
    dispatch({
      type: GET_ALL_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EVENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const patchEvent =
  (
    eventID,
    company,
    employee,
    client,
    name,
    start_time,
    end_time,
    note,
    status,
    date
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_EVENT_REQUEST });

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
        `${BASE_URL}/event/${eventID}/`,
        {
          company,
          employee,
          client,
          name,
          start_time,
          end_time,
          note,
          status,
          date,
        },
        config
      );
      dispatch({
        type: UPDATE_EVENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_EVENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.delete(`${BASE_URL}/event/${id}/`, config);
    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userpatchEvent =
  (id, company, name, status, note) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_EVENT_REQUEST });

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
        `${BASE_URL}/event/${id}/`,
        {
          company,
          name,
          status,
          note,
        },
        config
      );
      dispatch({
        type: UPDATE_EVENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_EVENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const publish = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PUBLISH_EVENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(
      `${BASE_URL}/month/${id}/publish`,

      config
    );
    dispatch({
      type: PUBLISH_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PUBLISH_EVENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
