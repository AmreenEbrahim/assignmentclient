const setStories = (state = [], action) => {
  switch (action.type) {
    case "SET-STORIES":
      return action.payload;
    default:
      return state;
  }
};

export default setStories;
