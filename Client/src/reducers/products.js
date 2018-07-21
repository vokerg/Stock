const products = (state=[], action) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS': return [...action.payload.products];
    default: return state;
  }
}

export const  getProducts = state => state;
export const  getProduct = (state, id) => state.find(product => product.id === id);

export default products;
