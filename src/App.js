import React from "react";
import "./App.css";
import CodeIO from "./components/CodeIO";
import Navbar from "./components/Navbar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Home";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ height: "100%" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/CodeIO-IDE" component={Home} />
          <Route exact path="/:id/:roomid" component={CodeIO} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
{
  /* <Home /> */
}
{
  /* <Navbar />
      <CodeIO /> */
}
