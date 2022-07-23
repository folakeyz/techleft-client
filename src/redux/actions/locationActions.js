import axios from "axios";
import {
  CREATE_LOCATION_FAIL,
  CREATE_LOCATION_REQUEST,
  CREATE_LOCATION_SUCCESS,
  GET_LOCATION_FAIL,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAIL,
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_SUCCESS,
} from "../constants/locationConstants";
import { BASE_URL } from "../config";

export const createLocation =
  (branch, longitude, latitude, max_radius) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_LOCATION_REQUEST });

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
        `${BASE_URL}/location/`,
        {
          branch,
          longitude,
          latitude,
          max_radius,
        },
        config
      );
      dispatch({
        type: CREATE_LOCATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_LOCATION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchLocation = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_LOCATION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/location/`, config);
    dispatch({
      type: GET_LOCATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LOCATION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const patchLocation =
  (id, branch, longitude, latitude, max_radius) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_LOCATION_REQUEST });

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
        `${BASE_URL}/location/${id}/`,
        {
          branch,
          longitude,
          latitude,
          max_radius,
        },
        config
      );
      dispatch({
        type: UPDATE_LOCATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_LOCATION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteLocation = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_LOCATION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.delete(`${BASE_URL}/location/${id}/`, config);
    dispatch({
      type: DELETE_LOCATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LOCATION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
