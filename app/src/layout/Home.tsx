import React, { Component } from 'react';
import Button from 'antd/es/button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Row, Input, Col } from 'antd';


class Home extends Component {
  render() {
    return (
      <div>
        <br />
        <Row align='middle' justify='center' type='flex'>
          <Col span={4}>
            <Input placeholder='Code (ex: G54ML)'></Input>
          </Col>
        </Row>
        <br />
        <Row align='middle' justify='center' type='flex'>
          <Link to="/create">
            <Button>Créé un sondage</Button>
          </Link>
        </Row>
      </div>
    );
  }
}

export default Home;