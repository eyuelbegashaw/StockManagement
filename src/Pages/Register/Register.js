import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../Components/Alert";
import * as authenticationAPI from "../../Api/authentication";

const Register = () => {
  const [form, setForm] = useState({ roleName: "", password: "", userName: "" });
  const [alert, setAlert] = useState({ show: false, type: "", text: "" });
  const handleChange = (e) => {
    const name = e.target.name;
    setForm({ ...form, [name]: e.target.value });
  };

  const handleSave = async () => {
    let response = await authenticationAPI.Register(form);
    console.log(response);
    handleAlert({ type: "success", text: `Registred Successfully` });
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 6000);
  };

  return (
    <div className="container my-5" style={{ width: 500 }}>
      <h1 className="h1 my-4 fw-bold">Register</h1>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <p>
        Username
        <input
          type="text"
          name="userName"
          value={form.userName}
          onChange={(e) => handleChange(e)}
          className="form-control"
        />
      </p>
      <p>
        Password
        <input
          type="text"
          name="password"
          value={form.password}
          onChange={(e) => handleChange(e)}
          className="form-control"
        />
      </p>
      <p>
        Role
        <select
          className="form-select"
          name="roleName"
          value={form.roleName}
          onChange={(e) => handleChange(e)}
        >
          <option value="Admin">Admin</option>
          <option value="Cashier">Cashier</option>
          <option value="Manager">Manager</option>
        </select>
      </p>
      <button className="btn btn-success" onClick={handleSave}>
        Register
      </button>

      <div className="my-4">
        Already have an account ? {"       "}
        <Link to="/login" className="text-primary text-decoration-underline fs-6">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;
