import axios from "axios";
export const readData = async (user) => {
  const data = await fetch("https://localhost:5001/api/Element/GetAll/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const res = await data.json();
  return res.lists;
};

export const createData = async (newData, user) => {
  /* const data = await fetch("https://localhost:5001/api/Element", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(newData),
  });*/

  const API_URL = "https://localhost:5001/api/Element";
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.post(API_URL, newData, config);
};

export const deleteData = async (code, user) => {
  const data = await fetch(`https://localhost:5001/api/Element?code=${code}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};

export const updateData = async (code, update, user) => {
  const data = await fetch(`https://localhost:5001/api/Element?code=${code}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(update),
  });
  //const res = await data.json();
  //return res;
};
