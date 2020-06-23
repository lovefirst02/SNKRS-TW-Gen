import React from 'react';

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
    };
  }

  componentDidMount() {
    fetch(`https://api.nike.com/launch/launch_views/v2/?filter=productId(${this.props.props})`)
      .then((res) => res.json())
      .then((json) => {
        json.objects.map(({ startEntryDate }) => {
          const entryTime = new Date(startEntryDate).toLocaleString();
          this.setState({ time: entryTime });
        });
      });
  }
  render() {
    return <p>投籤時間：{this.state.time}</p>;
  }
}

export default Time;
