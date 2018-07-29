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
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Category extends React.PureComponent {
  state = { open:false };
  handleClick = () => this.setState({ open: !this.state.open });

  handleAddAttributeClick = event => {
    console.log("clicked");
  }

  render() {
    const { category, classes } = this.props;
    return (
      <React.Fragment>
        <ListItem>
          <ListItemText inset primary={category.name} onClick={this.handleClick}/>
          <ListItemIcon onClick={this.handleAddAttributeClick}>
            <AddCircle />
          </ListItemIcon>
          <span onClick={this.handleClick}>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </span>
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.categoryAttributes.map(attribute =>
              <ListItem className={classes.nested}>
                <ListItemText inset primary={attribute.name} />
              </ListItem>
            )}
          </List>
        </Collapse>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Category);
