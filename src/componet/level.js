import React from 'react';

class Stocklevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: '',
    };
  }

  componentDidMount() {
    const url = `https://distracted-brown-13aaee.netlify.app/.netlify/functions/api/stock/${this.props.id}`
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const level = json.level;
        this.setState({ level: level });
      });
  }

  render() {
    return this.state.level;
  }
}

export default Stocklevel;
