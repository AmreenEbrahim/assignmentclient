const setStoriesCount = (state = 0, action) => {
  switch (action.type) {
    case "SET-STORIES-COUNT":
      return action.payload;
    default:
      return state;
  }
};

export default setStoriesCount;
