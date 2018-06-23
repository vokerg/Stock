export const getProductPictures = productId => next => {
  fetch(`/metadata/imagelist/product/${productId}`)
  .then(response => response.json())
  .then(orders => next(orders));
}
