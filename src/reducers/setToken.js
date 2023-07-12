let data;
if (localStorage.getItem("AuthToken")) {
  data = localStorage.getItem("AuthToken");
}

const setToken = (state = "", action) => {
  switch (action.type) {
    case "SET-TOKEN":
      localStorage.setItem("AuthToken", action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default setToken;
