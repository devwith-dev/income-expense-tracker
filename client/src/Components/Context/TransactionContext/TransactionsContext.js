import React, { createContext, useReducer } from "react";
import axios from "axios";

import {
  TRANSACTION_CREATION_FAIL,
  TRANSACTION_CREATION_SUCCESS,
} from "./transactionsActionTypes";
import { API_URL_TRANSACTION } from "../../../utils/apiURL";

export const TransactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth")),
};
const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_CREATION_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);

  //create account
  const createTransactionAction = async (accountData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const response = await axios.post(
        API_URL_TRANSACTION,
        accountData,
        config
      );
      console.log(response);
      if (response?.data?.status === "Success") {
        dispatch({
          type: TRANSACTION_CREATION_SUCCESS,
          payload: response?.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: TRANSACTION_CREATION_FAIL, payload: error });
    }
  };
  return (
    <TransactionContext.Provider
      value={{
        transaction: state?.transaction,
        transactions: state?.transactions,
        createTransactionAction,
        error: state?.error,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
