import axios from "axios";
import {
  CREATE_DEPARTMENT_FAIL,
  CREATE_DEPARTMENT_REQUEST,
  CREATE_DEPARTMENT_SUCCESS,
  GET_DEPARTMENT_FAIL,
  GET_DEPARTMENT_REQUEST,
  GET_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_FAIL,
  UPDATE_DEPARTMENT_REQUEST,
  UPDATE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_FAIL,
  DELETE_DEPARTMENT_REQUEST,
  DELETE_DEPARTMENT_SUCCESS,
} from "../constants/departmentConstants";
import { BASE_URL } from "../config";

export const createDepartment =
  (company, branch, name, email, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_DEPARTMENT_REQUEST });

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
        `${BASE_URL}/department/`,
        {
          company,
          branch,
          name,
          email,
          description,
        },
        config
      );
      dispatch({
        type: CREATE_DEPARTMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_DEPARTMENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchDepartment = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DEPARTMENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/department/`, config);
    dispatch({
      type: GET_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEPARTMENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const patchDepartment =
  (id, company, branch, name, email, description) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_DEPARTMENT_REQUEST });

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
        `${BASE_URL}/department/${id}/`,
        {
          company,
          branch,
          name,
          email,
          description,
        },
        config
      );
      dispatch({
        type: UPDATE_DEPARTMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DEPARTMENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteDepartment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_DEPARTMENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.delete(
      `${BASE_URL}/department/${id}/`,
      config
    );
    dispatch({
      type: DELETE_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DEPARTMENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
