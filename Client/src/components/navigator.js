import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navigator extends React.Component  {
  constructor() {
    super();
    this.state={
      anchorEl:null
    };
  }
  handleMenu = event => {
    console.log('clicked', this.state.anchorEl, event.currentTarget)
    this.setState({anchorEl: event.currentTarget})
  }

  render() {
    const {classes} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);
    console.log('open',  open);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Stock app
            </Typography>
            <IconButton aria-haspopup="true" color="inherit" onClick={this.handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
              transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
              open={open}

            >
              <MenuItem onClick={this.handleMenu}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Navigator);
