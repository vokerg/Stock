import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import { getCategories } from '../../api';
import Category from './category';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class Categories extends React.Component {
  state = { categories: [], open: false };

  componentDidMount() {
    getCategories(categories => this.setState({ categories }));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Categories</ListSubheader>}
        >
          {this.state.categories.map(category =>
              <Category category={category}/>
          )}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(Categories);
