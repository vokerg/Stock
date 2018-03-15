import React from 'react';
import { Link } from 'react-router-dom';
import { getStock } from '../api';

class Stock extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      name: ""
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    getStock(id)(stock => this.setState({
      ...stock
    }));
  }

  render() {
    const {id} = this.props.match.params;
    return (
      <div>
        <span>{this.state.name}</span>
        ..
        <span><Link to={`/`}>List</Link></span>
        ..
        <span><Link to={`/stocks/${id}/edit`}>Edit</Link></span>
      </div>
    )
  }
}

export default Stock;
