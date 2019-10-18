import React, { Component } from 'react';
import Button from 'antd/es/button';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Foo, Bar } from './Pages';

import Home from './layout/Home';
import Create from './layout/Create';
import Survey from './layout/Survey';
import Share from './layout/Share';
import Result from './layout/Result';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/create">Create</Link>
              <Link to="/survey/h24s2e">Survey</Link>
              <Link to="/share/h24s2e">Share</Link>
              <Link to="/result/h24s2e">Résult</Link>
            </nav>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/survey/:id" component={Survey} />
              <Route exact path="/share/:id" component={Share} />
              <Route exact path="/result/:id" component={Result} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;