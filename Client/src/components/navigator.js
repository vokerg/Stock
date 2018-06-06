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
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
  list: {
    width: 250,
  }
};

class Navigator extends React.Component  {
  constructor() {
    super();
    const user = JSON.parse(localStorage.getItem('user'));
    this.state={
      anchorEl: null,
      drawer: false,
      username: (user!=null) ? user.username : null
    };
  }

  handleMenu = event => this.setState({anchorEl: event.currentTarget})
  closeMenu = () => this.setState({anchorEl: null})
  toggleDrawer = open => () => this.setState({drawer:open})
  redirect = url => () => this.props.history.push(`/${url}`)
  logout = () => {
    this.closeMenu();
    this.redirect('logout')();
  }

  render() {
    const {classes} = this.props;
    const {anchorEl, drawer, username} = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" className={classes.menuButton} onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Stock app
            </Typography>
            <span>{username}</span>
            <div>
              {(username != null)
                ?<div>
                  <IconButton aria-haspopup="true" color="inherit" onClick={this.handleMenu}>
                    <AccountCircle/>
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
                      onClose = {this.closeMenu}
                    >
                      <MenuItem onClick={this.logout}>Logout</MenuItem>
                    </Menu>
                  </div>
                  :<div>
                    <Button color="inherit" onClick={this.redirect('login')}>Login</Button>
                    <Button color="inherit" onClick={this.redirect('signup')}>Signup</Button>
                  </div>
                }
              </div>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={drawer}
          onClose = {this.toggleDrawer(false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <div className={classes.list}>
              <List>
                <ListItem button>
                  <ListItemText primary="Stocks" onClick={this.redirect('stocks')}/>
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Products" onClick={this.redirect('products')}/>
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Orders" onClick={this.redirect('orders')}/>
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(Navigator);
