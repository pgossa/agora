import React, { Component } from 'react';
import Button from 'antd/es/button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";
import axios from "axios";

interface MatchParams {
  id: string;
}

interface ComponentProps extends RouteComponentProps<MatchParams>{}
class Survey extends Component<ComponentProps> {

  componentDidMount(){

    // axios.get(`/api/users/${this.props.match.params.id}`)
    //   .then(({ data: user }) => {
    //     console.log('user', user);
  
    //     this.setState({ user });
    //   });
  }
  render() {
    return (
      <div>
          Survey new
          <br></br>
          {this.props.match.params.id}
          <br></br>
          <Button type="default">Boutton</Button>
      </div>
    );
  }
}

export default Survey;