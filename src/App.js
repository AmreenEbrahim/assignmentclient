import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "../src/Components/Layout";
import Login from "./Components/Login";
import User from "./Components/User";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./actions/setToken";

function RouteWrapper({ component: Component, layout: Layout, ...rest }) {
  return (
    <>
      {/* <Leftpanel panelName="dashboard" /> */}
      <Route
        {...rest}
        render={(props) => (
          <Layout {...props}>
            <div>
              <div>
                <Component {...props} />
              </div>
            </div>
          </Layout>
        )}
      />
    </>
  );
}
function App() {
  let dispatch = useDispatch();
  const token = useSelector((state) => state.setToken);
  useEffect(() => {
    if (localStorage.getItem("AuthToken")) {
      dispatch(setToken(localStorage.getItem("AuthToken")));
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        {token ? (
          <Routes>
            <Route exact path="/" name="user" element={<User />} />
            {/* <Route path="" component={User} layout={Layout} exact /> */}
          </Routes>
        ) : (
          <Routes>
            <Route path="/" name="login" element={<Login />} exact />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
