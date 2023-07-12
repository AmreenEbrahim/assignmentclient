const setDashboardCount = (state = [], action) => {
  switch (action.type) {
    case "SET-COUNT":
      return action.payload;
    default:
      return state;
  }
};

export default setDashboardCount;
