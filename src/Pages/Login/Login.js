import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../../Components/Alert";
import * as authenicationAPI from "../../Api/authentication";
import Background from "./image/Background.jpg";
import "./css/Login.css";
import { userContext } from "../../Context/GlobalState";

const Login = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const [alert, setAlert] = useState({ show: false, type: "", text: "" });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await authenicationAPI.Login(formData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      navigate("/maintainance");
    } else {
      handleAlert({ type: "danger", text: `invalid credentials` });
    }
  };

  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 6000);
  };

  return (
    <div className="limiter">
      <div>{alert.show && <Alert type={alert.type} text={alert.text} />}</div>
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form-title" style={{ backgroundImage: `url(${Background})` }}>
            <span className="login100-form-title-1"> Sign In </span>
          </div>

          <form className="login100-form validate-form" onSubmit={onSubmit}>
            <div
              className="wrap-input100 validate-input m-b-26"
              data-validate="Username is required"
            >
              <span className="label-input100">Username</span>
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={onChange}
                value={username}
              />
              <span className="focus-input100"></span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-18 mt-1"
              data-validate="Password is required"
            >
              <span className="label-input100">Password</span>
              <input
                className="input100"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter password"
              />
              <span className="focus-input100"></span>
            </div>

            <div>
              <button type="submit" className="button btn btn-success mt-4">
                Login
              </button>
              <br />
              <div className="my-4">
                Dont have an account ?{"       "}
                <Link to="/register" className="text-primary text-decoration-underline fs-6">
                  Register here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
