import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Components/Context/AuthContext/AuthContext";
import { AccountContextProvider } from "./Components/Context/AccountContext/AccountContext";
import {
  TransactionContext,
  TransactionContextProvider,
} from "./Components/Context/TransactionContext/TransactionsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AccountContextProvider>
      <AuthContextProvider>
        <TransactionContextProvider>
          <App />
        </TransactionContextProvider>
      </AuthContextProvider>
    </AccountContextProvider>
  </React.StrictMode>
);
