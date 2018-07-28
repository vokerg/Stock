import React from 'react';
import { getCategories } from '../../api';

class Categories extends React.Component {
  state = { categories: [] };

  componentDidMount() {
    getCategories(categories => this.setState({ categories }));
  }
  
  render() {
    return (
      <div>
        {
          this.state.categories.map(category =>
            <div>
              <div>->{category.name}</div>
              {category.categoryAttributes.map(attribute =>
                <div>->->{attribute.name}</div>
              )}
            </div>
          )
        }
      </div>
    )
  }
}

export default Categories;
