export const createData = async (newData, user) => {
  const data = await fetch("https://localhost:5001/api/Voucher", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(newData),
  });
  // const res = await data.json();
  // return res;
};
