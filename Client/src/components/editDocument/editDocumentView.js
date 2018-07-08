import React from 'react';

const EditDocumentView = ({
  selectedOperationType,
  operationTypes,
  selectedStock,
  selectedStock2,
  stocks,
  stocks2,
  transfer,
  submitDocument,
  operationTypeChange,
  stockChange,
  children
}) => {
  return (
    <form onSubmit={submitDocument}>
      <table>
        <tbody>
          <tr>
            <td>
              <select value={selectedOperationType} onChange={operationTypeChange}>
                <option value="0"></option>
                {operationTypes.map(element =>
                  <option key={element.id} value={element.id}>{element.name}</option>
                )}
              </select>
            </td>
            <td>
              <select value={selectedStock} name="selectedStock" onChange={stockChange}>
                <option value="0"></option>
                {stocks.map(element =>
                  <option key={element.id} value={element.id}>{element.name}</option>
                )}
              </select>
            </td>
            <td>
              <select value={selectedStock2} name="selectedStock2" onChange={stockChange} disabled={!transfer}>
                <option value="0"></option>
                {stocks2.map((element, key) =>
                  <option key={key}>{element.name}</option>
                )}
              </select>
            </td>
          </tr>
          {children}
        </tbody>
      </table>
    </form>
  )
}

export default EditDocumentView;
