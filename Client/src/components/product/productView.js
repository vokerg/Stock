import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
  gallery: {
    margin: '5px',
    border: '1px solid #ccc',
    display: 'inline-block',
    width: '180px',
    '&:hover': {
       border: '1px solid #777',
    },
  },
  img: {
    width: '100%',
    height: 'auto',
  }
});

class ProductView extends React.Component {
  constructor() {
    super();
    this.state = {
      imgDlgOpen: false,
      imgDlgSrc: ''
    }
  }

  handleClickOpen = imgDlgSrc => () => this.setState({imgDlgOpen: true, imgDlgSrc})
  handleClose = () => this.setState({imgDlgOpen: false})

  render() {
    const {id, name, isAllowedProductEdit, productPictureIds, classes} = this.props;
    return (
      <div>
        <Toolbar>
          <div>{name}</div>
          <Button href={'/products'}>List</Button>
          <Button href={`/products/${id}/edit`} disabled={!isAllowedProductEdit}>Edit</Button>
          <Button href={`/products/${id}/imagemanagement`} disabled={!isAllowedProductEdit}>Images</Button>
        </Toolbar>
        <div>
          {productPictureIds && productPictureIds.length > 0 &&
            productPictureIds.map((ppId, key) =>
              <div key={key} className={classes.gallery} onClick={this.handleClickOpen(`/metadata/images/product/${id}/${productPictureIds[key]}`)}>
                <img src={`/metadata/images/product/${id}/${productPictureIds[key]}`} className={classes.img} alt='' />
              </div>
            )
          }
          <Dialog
            open={this.state.imgDlgOpen}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
           <DialogContent>
            <img src={this.state.imgDlgSrc} className={classes.img} alt='' />
           </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ProductView);
