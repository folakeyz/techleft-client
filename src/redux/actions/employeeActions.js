import axios from "axios";
import {
  CREATE_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAIL,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  SEND_INVITE_FAIL,
  SEND_INVITE_REQUEST,
  SEND_INVITE_SUCCESS,
} from "../constants/employeeConstants";
import { BASE_URL } from "../config";

export const createEmployee =
  (
    user,
    company,
    branch,
    department,
    employee_id,
    role,
    date_of_birth,
    address,
    province,
    country,
    postal_code,
    hobbies,
    join_date,
    phone
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_EMPLOYEE_REQUEST });

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
        `${BASE_URL}/employee/`,
        {
          user,
          company,
          branch,
          department,
          employee_id,
          role,
          date_of_birth,
          address,
          province,
          country,
          postal_code,
          hobbies,
          join_date,
          phone,
        },
        config
      );
      dispatch({
        type: CREATE_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchEmployee = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_EMPLOYEE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/employee/`, config);
    dispatch({
      type: GET_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const patchEmployee =
  (
    id,
    user,
    company,
    branch,
    department,
    role,
    date_of_birth,
    address,
    province,
    country,
    postal_code,
    hobbies,
    join_date,
    phone,
    employee_id
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_EMPLOYEE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.patch(
        `${BASE_URL}/employee/${id}/`,
        {
          user,
          company,
          branch,
          department,
          role,
          date_of_birth,
          address,
          province,
          country,
          postal_code,
          hobbies,
          join_date,
          phone,
          employee_id,
        },
        config
      );
      dispatch({
        type: UPDATE_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteEmployee = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_EMPLOYEE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.delete(`${BASE_URL}/employee/${id}/`, config);
    dispatch({
      type: DELETE_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const inviteEmployee = (email) => async (dispatch, getState) => {
  try {
    dispatch({ type: SEND_INVITE_REQUEST });

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
      `${BASE_URL}/employee/email`,
      { email },
      config
    );
    dispatch({
      type: SEND_INVITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_INVITE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
