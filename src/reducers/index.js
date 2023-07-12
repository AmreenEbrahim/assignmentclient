import { combineReducers } from "redux";
import setStories from "./setStories";
import setDashboardCount from "./setDashboardCount";
import setStoriesCount from "./setStoriesCount";
import setToken from "./setToken";
import setUsers from "./setUsers";

const rootReducers = combineReducers({
  setStories,
  setDashboardCount,
  setStoriesCount,
  setToken,
  setUsers,
});

export default rootReducers;
