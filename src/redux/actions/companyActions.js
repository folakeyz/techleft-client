import axios from "axios";
import {
  CREATE_COMPANY_FAIL,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  GET_COMPANY_FAIL,
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
} from "../constants/companyConstants";
import { BASE_URL } from "../config";

export const createCompany = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_COMPANY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.post(`${BASE_URL}/company/`, formData, config);
    dispatch({
      type: CREATE_COMPANY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMPANY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getMyCompany = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_COMPANY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/company/`, config);
    dispatch({
      type: GET_COMPANY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMPANY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateMyCompany = (formData, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_COMPANY_REQUEST });

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
      `${BASE_URL}/company/${id}/`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_COMPANY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COMPANY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
