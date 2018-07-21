import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
});

const EditDocumentView = ({
  selectedOperationType,
  operationTypes,
  selectedStock,
  selectedStock2,
  stocks,
  transfer,
  submitDocument,
  operationTypeChange,
  stockChange,
  children,
  classes
}) => {
  return (
    <form onSubmit={submitDocument} >
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="operation_type">Operation type</InputLabel>
          <Select
            value={selectedOperationType}
            onChange={operationTypeChange}
            inputProps={{
              name: 'selectedOperationType',
              id: 'selectedOperationType',
            }}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            {operationTypes.map(element =>
              <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="selectedStock">Stock</InputLabel>
          <Select
            value={selectedStock}
            onChange={stockChange}
            inputProps={{
              name: 'selectedStock',
              id: 'selectedStock',
            }}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            {stocks.map(element =>
              <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl} disabled={!transfer}>
          <InputLabel htmlFor="selectedStock2">Stock</InputLabel>
          <Select
            value={selectedStock2}
            onChange={stockChange}
            inputProps={{
              name: 'selectedStock2',
              id: 'selectedStock2',
            }}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            {stocks.map(element =>
              <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      <td>
        {children}
      </td>

    </form>
  )
}

export default withStyles(styles)(EditDocumentView);
