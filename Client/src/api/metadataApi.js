export const getProductPictures = productId => next => {
  fetch(`/metadata/imagelist/product/${productId}`)
  .then(response => response.json())
  .then(orders => next(orders));
}

export const addProductPicture = (productId, file) => next => {
  let formData = new FormData();
  formData.append('image', file);
  fetch(`/metadata/images/product/${productId}`, {
      method: 'post',
      body: formData,
  }).then(res => next(res));
}

export const removeProductImage = (productId, imageId) => next =>
  fetch(`/metadata/images/product/${productId}/${imageId}`,{
    method: 'delete',
    body: {}
  }).then (res => next(res));
