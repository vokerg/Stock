import React from 'react';
import { connect } from 'react-redux';

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
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';

import { getCurrentUser, getDraftsList } from '../reducers';

const styles = theme => ({
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
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

class Navigator extends React.Component  {
  constructor(props) {
    super(props);
    const {user} = this.props;
    this.state={
      anchorEl: null,
      drawer: false
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
  draftClick = draftId => () => {
    this.closeMenu();
    this.redirect(`draftDocument/${draftId}`)();
  }

  render() {
    const {classes, user, drafts} = this.props;
    const {anchorEl, drawer} = this.state;
    const username = (user !== null && user.username !== '') ? user.username : null
    const open = Boolean(anchorEl);
    return (
      <Paper className={classes.root}>
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
                    {drafts.length > 0 ?
                      <Badge className={classes.padding} badgeContent={drafts.length} color="secondary">
                        <AccountCircle/>
                      </Badge>
                      : <AccountCircle/>
                    }
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
                      {drafts.map(draft =>
                        <MenuItem key={draft.draftId} onClick={this.draftClick(draft.draftId)}>{draft.draftName}</MenuItem>
                      )}
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
                <ListItem button onClick={this.redirect('stocks')}>
                  <ListItemText primary="Stocks"/>
                </ListItem>
                <ListItem button onClick={this.redirect('products')}>
                  <ListItemText primary="Products" />
                </ListItem>
                <ListItem button onClick={this.redirect('documents')}>
                  <ListItemText primary="Documents" />
                </ListItem>
                <ListItem button onClick={this.redirect('orders')}>
                  <ListItemText primary="Orders" />
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
    user: getCurrentUser(state),
    drafts: getDraftsList(state)
  });

const mapDispatchToProps = dispatch => ({

});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Navigator));
