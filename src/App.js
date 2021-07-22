import { React, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Search,
  History,
  Navigation
} from "./components";
import "./App.css";

const App = () => {
  const [history, setHistory] = useState([]);
  const [keywords, setKeywords] = useState(new Set());
  return (
    <div className="app">
      <Router>
        <Navigation/>
        <Switch>
        <Route path="/history">
            <History
              history={history}
              keywords={keywords}
            />
          </Route>
          <Route path="/*">
            <Search
              history={history}
              setHistory={setHistory}
              keywords={keywords}
              setKeywords={setKeywords}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
