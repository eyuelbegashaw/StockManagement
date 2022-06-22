import { useState, useEffect, useContext, useRef } from "react";
import { userContext } from "../../Context/GlobalState";
import Alert from "../../Components/Alert";

import * as roleAPI from "../../Api/roleAPI";

const Access = () => {
  const { user, setUser } = useContext(userContext);
  const [alert, setAlert] = useState({ show: false, type: "", text: "" });
  const [data, setData] = useState([]);
  const didMount = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await roleAPI.readData(user);
      setData(res);
    };

    if (didMount.current) {
      transformData();
    } else {
      didMount.current = true;
      fetchData();
    }
  }, [data]);

  const [form, setForm] = useState({
    AdminConsignee: false,
    AdminElement: false,
    AdminPerson: false,
    AdminVoucher: false,
    AdminRole: false,
    CashierConsignee: false,
    CashierElement: false,
    CashierPerson: false,
    CashierVoucher: false,
    CashierRole: false,
    ManagerConsignee: false,
    ManagerElement: false,
    ManagerPerson: false,
    ManagerVoucher: false,
    ManagerRole: false,
  });

  //Transform received data into boolean data types
  const transformData = () => {
    let name = "Admin";
    for (let i = 0; i < 3; i++) {
      let obj = {};
      if (i == 1) name = "Cashier";
      if (i == 2) name = "Manager";
      data.forEach((current) => {
        if (current.roleName == name) {
          obj[name + current.resourceName] = true;
        }
      });
      setForm((prevState) => ({ ...prevState, ...obj }));
    }
  };

  /*Transforms the boolean form into array of objects 
    structure and save it*/
  const handleSave = async () => {
    let array = [];
    let name = "Admin";
    for (let i = 0; i < 3; i++) {
      if (i == 1) name = "Cashier";
      if (i == 2) name = "Manager";
      if (form[name + "Consignee"] == true) {
        array.push({
          resourceName: "Consignee",
          roleName: name,
        });
      }
      if (form[name + "Element"] == true) {
        array.push({
          resourceName: "Element",
          roleName: name,
        });
      }
      if (form[name + "Person"] == true) {
        array.push({
          resourceName: "Person",
          roleName: name,
        });
      }
      if (form[name + "Voucher"] == true) {
        array.push({
          resourceName: "Voucher",
          roleName: name,
        });
      }
      if (form[name + "Role"] == true) {
        array.push({
          resourceName: "Role",
          roleName: name,
        });
      }
    }
    let obj = { list: array };
    await roleAPI.updateData(obj, user);
    handleAlert({ type: "success", text: `Saved Successfully ` });
  };

  //Handles state of the form
  const handleChange = (e) => {
    const name = e.target.name;
    setForm((prevState) => ({ ...prevState, [name]: e.target.checked }));
  };

  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false, type, text });
    }, 7000);
  };

  return (
    <div className="container">
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Admin</th>
            <th>Cashier</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Consignee</td>
            <td>
              <input
                type="checkbox"
                name="AdminConsignee"
                checked={form.AdminConsignee}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="CashierConsignee"
                checked={form.CashierConsignee}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="ManagerConsignee"
                checked={form.ManagerConsignee}
                onChange={(e) => handleChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Element</td>
            <td>
              <input
                type="checkbox"
                name="AdminElement"
                checked={form.AdminElement}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="CashierElement"
                checked={form.CashierElement}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="ManagerElement"
                checked={form.ManagerElement}
                onChange={(e) => handleChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Person</td>
            <td>
              <input
                type="checkbox"
                name="AdminPerson"
                checked={form.AdminPerson}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="CashierPerson"
                checked={form.CashierPerson}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="ManagerPerson"
                checked={form.ManagerPerson}
                onChange={(e) => handleChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Voucher</td>
            <td>
              <input
                type="checkbox"
                name="AdminVoucher"
                checked={form.AdminVoucher}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="CashierVoucher"
                checked={form.CashierVoucher}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="ManagerVoucher"
                checked={form.ManagerVoucher}
                onChange={(e) => handleChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Role</td>
            <td>
              <input
                type="checkbox"
                name="AdminRole"
                checked={form.AdminRole}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="CashierRole"
                checked={form.CashierRole}
                onChange={(e) => handleChange(e)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="ManagerRole"
                checked={form.ManagerRole}
                onChange={(e) => handleChange(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button className="btn btn-primary my-4" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Access;
