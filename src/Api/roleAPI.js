export const readData = async (user) => {
  const data = await fetch("https://localhost:5001/api/Role/GetResourceRole", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const res = await data.json();
  return res;
};

export const updateData = async (update, user) => {
  const data = await fetch(`https://localhost:5001/api/Role/UpdateResourceRole`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(update),
  });
};
