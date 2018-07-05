import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

const PictureGalleryView = ({productPictureIds, imgDlgOpen, handleClose, imgDlgSrc, classes, handleClickOpen, imgPathStatic, isAllowedRemove, removeImageClick}) => {
  return (
    <div>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={4.5}>
          {productPictureIds && productPictureIds.length > 0 &&
            productPictureIds.map((ppId, key) =>
              <GridListTile onClick={handleClickOpen(`${imgPathStatic}/${productPictureIds[key]}`)}>
                <img src={`${imgPathStatic}/${productPictureIds[key]}`} alt='' />
                {isAllowedRemove &&
                  <GridListTileBar
                    actionIcon={
                      <IconButton className={classes.icon} onClick={removeImageClick(ppId)}>
                        <DeleteIcon/>
                      </IconButton>
                    }
                    actionPosition="left"
                    className={classes.titleBar}
                  />
                }
              </GridListTile>
            )
          }
        </GridList>
      </div>
      <Dialog
        open={imgDlgOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <DialogContent>
        <img src={imgDlgSrc} className={classes.img} alt='' />
       </DialogContent>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(PictureGalleryView);
