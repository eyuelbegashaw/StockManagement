export const createData = async (newData, user) => {
  const data = await fetch("https://localhost:5001/api/Consignee", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(newData),
  });
};

export const updateData = async (code, update, user) => {
  const data = await fetch(`https://localhost:5001/api/Consignee?code=${code}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(update),
  });
};

export const readData = async (user) => {
  const data = await fetch("https://localhost:5001/api/Consignee/GetAll/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const res = await data.json();
  return res.lists;
};

export const deleteData = async (code, user) => {
  const data = await fetch(`https://localhost:5001/api/Consignee?code=${code}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};
