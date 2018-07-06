import React from 'react';
import { addProductPicture } from '../../api/metadataApi';
import PictureGallery from '../common/pictureGallery';
import { getProductPictures, removeProductImage } from '../../api/metadataApi'

class ImageManagement extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      productPictureIds: []
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    getProductPictures(id)(productPictureIds => this.setState({productPictureIds}));
  }

  onFileUpload = (event) => {
    const file = event.target.files[0];
    addProductPicture(1, file)(res => console.log(res));
  }

  deleteImage = id => productPictureId => removeProductImage(id, productPictureId)(() => console.log("removed"));

  render() {
    const {id} = this.props.match.params;
    return (
      <div>
        <PictureGallery
          productPictureIds={this.state.productPictureIds}
          imgPathStatic={`/metadata/images/product/${id}`}
          isAllowedRemove={true}
          deleteImage={this.deleteImage(id)}
        />
        <form >
          <input type="file"
               id="image" name="image"
               accept="image/png, image/jpeg" onChange={this.onFileUpload}/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default ImageManagement;
