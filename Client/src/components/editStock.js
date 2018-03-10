import React from 'react';
import { insertStocks } from '../api';

class EditStock extends React.Component {
  constructor() {
    super();
    this.state = {
      name:""
    };
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  submit = event => {
    event.preventDefault();
    insertStocks({name:this.state.name})(() => console.log("added"));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit.bind(this)}>
          <div>
            <label>Name</label>
            <input value={this.state.name} onChange={this.onNameChange.bind(this)} type="text"/>
          </div>
          <div>
            <input type="submit" value="Save"/>
          </div>
        </form>
      </div>
    )
  }
};

export default EditStock;
