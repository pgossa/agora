import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Row, Col, Input, Button, Icon } from 'antd';


class Create extends Component {
  render() {
    return (
      <div>
        <br/>
        <Row align='middle' justify='center' type='flex'>
          <Col span={10}>
            <Input placeholder='Question' addonAfter={<Icon type="question" />}></Input>
          </Col>
        </Row>
        <br/>
        <Button type="default">Create</Button>
      </div>
    );
  }
}

export default Create;