import React from 'react';
import { v4 as uuid4 } from 'uuid';

class Gen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return uuid4();
  }
}

export default Gen;
