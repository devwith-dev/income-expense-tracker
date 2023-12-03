import { createContext, useReducer } from "react";
import axios from "axios";
import {
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./authActionTypes";
import { API_URL_USER } from "../../../utils/apiURL";

//auth context
export const AuthContext = createContext();

//initial state
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  error: null,
  loading: false,
  profile: null,
};

//Auth Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        userAuth: null,
      };
    case LOGIN_SUCCESS:
      //add user to local storage
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
        userAuth: null,
      };
    //Profie
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: payload,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: null,
      };
    default:
      return state;
  }
};

//provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  //register action
  const registerUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${API_URL_USER}/register`,
        formData,
        config
      );
      console.log(response);

      if (response?.data?.status === "Success") {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data,
        });
      }

      //Redirect
      window.location.href = "/login";
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //login action
  const loginUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${API_URL_USER}/login`,
        formData,
        config
      );
      console.log(response);

      if (response?.data?.status === "Login Sucessful") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
      }

      //Redirect
      window.location.href = "/dashboard";
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };

  //logout action
  const logoutUserAction = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    //remove user from storage
    localStorage.removeItem("userAuth");
    //Redirect
    window.location.href = "/login";
  };

  //profile action
  const fetchProfileAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const response = await axios.get(`${API_URL_USER}/profile`, config);
      console.log(response);

      if (response?.data?.status === "success") {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: response?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        loginUserAction,
        state,
        fetchProfileAction,
        profile: state?.profile?.profile,
        error: state?.error,
        logoutUserAction,
        token: state?.userAuth?.token,
        registerUserAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
