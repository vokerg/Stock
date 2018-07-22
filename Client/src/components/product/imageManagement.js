import React from 'react';
import Input from '@material-ui/core/Input';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

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

  onFileUpload = id => event => {
    const file = event.target.files[0];
    addProductPicture(id, file)(
      () => getProductPictures(id)(productPictureIds => this.setState({productPictureIds}))
    );
  }

  deleteImage = id => productPictureId => removeProductImage(id, productPictureId)(
    () => getProductPictures(id)(productPictureIds => this.setState({productPictureIds}))
  );

  render() {
    const {id} = this.props.match.params;
    return (
      <div>
        <Toolbar>
          <Button onClick={() => this.props.history.push(`/products/${id}`)}>Back to product</Button>
        </Toolbar>
        <PictureGallery
          productPictureIds={this.state.productPictureIds}
          imgPathStatic={`/metadata/images/product/${id}`}
          isAllowedRemove={true}
          deleteImage={this.deleteImage(id)}
        />
        <Input type="file"
             id="image" name="image"
             accept="image/png, image/jpeg" onChange={this.onFileUpload(id)}/>
      </div>
    )
  }
}

export default ImageManagement;
