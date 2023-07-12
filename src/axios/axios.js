import Axios from "axios";
const onlineUser = localStorage.getItem("AuthToken");

// localStorage.setItem("AuthToken", JSON.stringify(res.data.token));
console.log("axios url", process.env.REACT_APP_API_URL);
console.log("onlineUser", onlineUser);
const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    Authorization: onlineUser,
  },
});

export default axios;
