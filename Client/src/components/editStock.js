import React from 'react';
import { insertStock, updateStock, getStock } from '../api/stockApi';

class EditStock extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      name:""
    };
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  componentDidMount() {
      const {id} = this.props.match.params;
      if (id !== undefined) {
        getStock(id)(stock => this.setState({...stock}));
      }
  }

  submit = event => {
    event.preventDefault();
    const {id} = this.props.match.params;
    const {push} = this.props.history;
    if (id !== undefined) {
      updateStock({...this.state})(
        () => push(`/stocks/${id}`)
      );
    } else {
      insertStock({name:this.state.name})(
        stock => push(`/stocks/${stock.id}`)
      );
    }
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
