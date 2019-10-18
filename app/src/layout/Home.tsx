import React, { Component } from 'react';
import Button from 'antd/es/button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class Home extends Component {
  render() {
    return (
      <div>
          HOME new
          
          <Button type="default">Boutton</Button>
      </div>
    );
  }
}

export default Home;