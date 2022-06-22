import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

//Navigation bars
import HeaderNav from "./Layout/HeaderNav";
import MaintainanceNav from "./Layout/MaintainanceNav";
import TransactionNav from "./Layout/TransactionNav";

//Maintance Pages
import Element from "./Pages/Maintainance/Element";
import Employee from "./Pages/Maintainance/Employee";
import Supplier from "./Pages/Maintainance/Supplier";
import Customer from "./Pages/Maintainance/Customer";
import Access from "./Pages/Maintainance/Access";

//Transaction Pages
import CashGood from "./Pages/Transaction/CashGood";
import StoreIssue from "./Pages/Transaction/StoreIssue";

//Authentication
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

//authentication sample page
import DashBoard from "./Pages/DashBoard";

//Global State
import { userContext } from "./Context/GlobalState";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      setUser(token);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/dashboard" element={<DashBoard />} />

          <Route path="/" element={<HeaderNav />}>
            <Route path="/maintainance" element={<MaintainanceNav />}>
              <Route index element={<h1 className="mx-auto my-5 ">Select Maintainance</h1>} />
              <Route path="element" element={<Element />} />
              <Route path="employee" element={<Employee />} />
              <Route
                path="consignee"
                element={<h1 className="mx-auto my-5 ">Select Consignee Type</h1>}
              />
              <Route path="consignee/customer" element={<Customer />} />
              <Route path="consignee/supplier" element={<Supplier />} />
              <Route path="Access" element={<Access />} />
            </Route>

            <Route path="transaction" element={<TransactionNav />}>
              <Route index element={<h1 className="mx-auto my-5 ">Select Transaction</h1>} />
              <Route path="cashgood" element={<CashGood />} />
              <Route path="storeissue" element={<StoreIssue />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </userContext.Provider>
  );
}

export default App;
