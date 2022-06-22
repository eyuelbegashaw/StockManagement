import axios from "axios";

export const Register = async (newData) => {
  const data = await fetch("https://localhost:5001/api/Authentication/Register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return data;
};

export const Login = async (newData) => {
  const API_URL = "https://localhost:5001/api/Authentication";
  const response = await axios.post(API_URL, newData);
  return response;
};
