import React, { Component } from 'react';
import Button from 'antd/es/button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class Create extends Component {
  render() {
    return (
      <div>
          Create new
          <br></br>
          <Button type="default">Boutton</Button>
      </div>
    );
  }
}

export default Create;