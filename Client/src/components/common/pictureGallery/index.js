import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import PictureGalleryView from './pictureGalleryView';

class PictureGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      imgDlgOpen: false,
      imgDlgSrc: '',
      confirmRemoveOpen: false,
      pictureToRemove: ''
    }
  }

  handleClickOpen = imgDlgSrc => (event) => {
    if (!this.props.isAllowedRemove) {
      this.setState({imgDlgOpen: true, imgDlgSrc})
    }
  }
  handleClose = () => this.setState({imgDlgOpen: false})
  //removeImageClick = ppId => () => this.props.deleteImage(ppId);
  removeImageClick = ppId => () => this.setState({confirmRemoveOpen: true, pictureToRemove: ppId})
  confirmRemoveCancel = () => this.setState({confirmRemoveOpen: false, pictureToRemove: ''});
  confirmRemoveOk = () => {
    this.props.deleteImage(this.state.pictureToRemove);
    this.setState({confirmRemoveOpen: false, pictureToRemove: ''});
  }


  render() {
    const {imgPathStatic, productPictureIds, isAllowedRemove} = this.props;
    return (
      <PictureGalleryView
        productPictureIds={productPictureIds}
        imgDlgOpen={this.state.imgDlgOpen}
        handleClose={this.handleClose}
        imgDlgSrc={this.state.imgDlgSrc}
        handleClickOpen={this.handleClickOpen}
        imgPathStatic={imgPathStatic}
        isAllowedRemove={isAllowedRemove}
        removeImageClick={this.removeImageClick}
        confirmRemoveOpen={this.state.confirmRemoveOpen}
        confirmRemoveCancel={this.confirmRemoveCancel}
        confirmRemoveOk={this.confirmRemoveOk}
      />
    )
  }
}

export default PictureGallery;
