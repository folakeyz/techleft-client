import axios from "axios";
import {
  CREATE_BRANCH_FAIL,
  CREATE_BRANCH_REQUEST,
  CREATE_BRANCH_SUCCESS,
  GET_BRANCH_FAIL,
  GET_BRANCH_REQUEST,
  GET_BRANCH_SUCCESS,
  UPDATE_BRANCH_FAIL,
  UPDATE_BRANCH_REQUEST,
  UPDATE_BRANCH_SUCCESS,
  DELETE_BRANCH_FAIL,
  DELETE_BRANCH_REQUEST,
  DELETE_BRANCH_SUCCESS,
} from "../constants/branchConstants";
import { BASE_URL } from "../config";

export const createBranch =
  (
    company,
    name,
    email,
    description,
    phone_numbers,
    address,
    province,
    country,
    postal_code
    // contact_person
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_BRANCH_REQUEST });

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
        `${BASE_URL}/branch/`,
        {
          company,
          name,
          email,
          description,
          phone_numbers,
          address,
          province,
          country,
          postal_code,
          // contact_person,
        },
        config
      );
      dispatch({
        type: CREATE_BRANCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BRANCH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchBranch = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BRANCH_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/branch/`, config);
    dispatch({
      type: GET_BRANCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BRANCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const patchBranch =
  (
    id,
    company,
    name,
    email,
    description,
    phone_numbers,
    address,
    province,
    country,
    postal_code
    // contact_person
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_BRANCH_REQUEST });

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
        `${BASE_URL}/branch/${id}/`,
        {
          company,
          name,
          email,
          description,
          phone_numbers,
          address,
          province,
          country,
          postal_code,
          // contact_person,
        },
        config
      );
      dispatch({
        type: UPDATE_BRANCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BRANCH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteBranch = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_BRANCH_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.delete(`${BASE_URL}/branch/${id}/`, config);
    dispatch({
      type: DELETE_BRANCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BRANCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
