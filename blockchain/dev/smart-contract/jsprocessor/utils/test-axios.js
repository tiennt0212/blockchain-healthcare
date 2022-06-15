import axios from "axios";
const endPoint = "http://localhost:5000";
const post = async (path, data) => {
  const res = await axios.post(`${endPoint}${path}`, data);
  console.log(res);
};

const get = async (path) => {
  const res = await axios.get(`${endPoint}${path}`);
  console.log(res);
};

get("/file", { name: "Thanh Tien" });
