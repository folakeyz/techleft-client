import axios from "axios";
import {
  CREATE_CLIENT_FAIL,
  CREATE_CLIENT_REQUEST,
  CREATE_CLIENT_SUCCESS,
  GET_CLIENT_FAIL,
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
  GET_SINGLE_CLIENT_FAIL,
  GET_SINGLE_CLIENT_REQUEST,
  GET_SINGLE_CLIENT_SUCCESS,
  REMOVE_ECLIENT_FAIL,
  REMOVE_ECLIENT_REQUEST,
  REMOVE_ECLIENT_SUCCESS,
} from "../constants/clientConstants";
import { BASE_URL } from "../config";

export const createClient =
  (
    company,
    name,
    email,
    phone,
    address,
    province,
    country,
    postal_code,
    join_date
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_CLIENT_REQUEST });

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
        `${BASE_URL}/client/`,
        {
          company,
          name,
          email,
          phone,
          address,
          province,
          country,
          postal_code,
          join_date,
        },
        config
      );
      dispatch({
        type: CREATE_CLIENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_CLIENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchClient = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CLIENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/client/`, config);
    dispatch({
      type: GET_CLIENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CLIENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchSingleClient = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SINGLE_CLIENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/client/${id}/`, config);
    dispatch({
      type: GET_SINGLE_CLIENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CLIENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const patchClient =
  (
    id,
    company,
    name,
    email,
    phone,
    address,
    province,
    country,
    postal_code,
    join_date
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_CLIENT_REQUEST });

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
        `${BASE_URL}/client/${id}/`,
        {
          company,
          name,
          email,
          phone,
          address,
          province,
          country,
          postal_code,
          join_date,
        },
        config
      );
      dispatch({
        type: UPDATE_CLIENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CLIENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteClient = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_CLIENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.delete(`${BASE_URL}/client/${id}/`, config);
    dispatch({
      type: DELETE_CLIENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CLIENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createEClient =
  (clientID, employee, name) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_CLIENT_REQUEST });

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
        `${BASE_URL}/client/${clientID}/`,
        {
          employee,
          name,
        },
        config
      );
      dispatch({
        type: UPDATE_CLIENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CLIENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const removeEClient = (id, clientID) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_ECLIENT_REQUEST });

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
      `${BASE_URL}/client/${clientID}/employee/remove`,
      { id },
      config
    );
    dispatch({
      type: REMOVE_ECLIENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_ECLIENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
