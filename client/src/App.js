import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Forms/Login";
import HomePage from "./Components/HomePage/HomePage";
import Register from "./Components/Forms/Register";
import Navbar from "./Components/Navbar/Navbar";
import AddTransaction from "./Components/Forms/AddTransaction";
import AccountDashboard from "./Components/Dashboard/AccountDashboard";
import AccountDetails from "./Components/Dashboard/AccountDetails";
import { AccountContextProvider } from "./Components/Context/AccountContext/AccountContext";
import AddAccount from "./Components/Forms/AddAccount";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AccountDashboard />} />
        <Route
          path="/account-details/:accountID"
          element={<AccountDetails />}
        />
        <Route path="/dashboard/accounts/create" element={<AddAccount/>}/>
        <Route path="/add-transaction/:accountID" element={<AddTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
