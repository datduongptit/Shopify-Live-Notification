import React from "react";
import "./App.css";
import "antd/dist/antd.css"; // 'antd/dist/antd.less'
import { Provider } from "react-redux";
import Views from "./components/contents/Views";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/live-sale-notification" component={Views} />
        {/* <Views /> */}
      </Router>
    </Provider>
  );
}

export default App;
