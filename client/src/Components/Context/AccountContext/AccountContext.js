import { API_URL_ACCOUNT } from "../../../utils/apiURL";
import {
  ACCOUNT_CREATION_FAIL,
  ACCOUNT_CREATION_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_SUCCESS,
} from "./accountActionTypes";

import { createContext, useReducer } from "react";
import axios from "axios";

export const AccountContext = createContext();

//initial state

const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  account: null,
  accounts: [],
  loading: false,
  error: null,
};

//reducer
const accountReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case ACCOUNT_DETAILS_FAIL:
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    case ACCOUNT_CREATION_SUCCESS:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case ACCOUNT_CREATION_FAIL:
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

//provider

export const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);

  //get account details action
  const getAccountDetailsAction = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const response = await axios.get(`${API_URL_ACCOUNT}/${id}`, config);
      console.log(response);
      //dispatch
      if (response?.data?.status === "Success") {
        dispatch({
          type: ACCOUNT_DETAILS_SUCCESS,
          payload: response?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ACCOUNT_DETAILS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //create account action
  const createAccountAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const response = await axios.post(API_URL_ACCOUNT, formData, config);
      console.log(response);
      //dispatch
      if (response?.data?.status === "Success") {
        dispatch({
          type: ACCOUNT_CREATION_SUCCESS,
          payload: response?.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ACCOUNT_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <AccountContext.Provider
      value={{
        createAccountAction,
        getAccountDetailsAction,
        account: state?.account?.data,
        error: state?.error,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
