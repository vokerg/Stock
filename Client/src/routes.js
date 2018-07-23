import React from 'react';
import { Route } from 'react-router-dom';

import Stocks from './components/stocks';
import EditStock from './components/editStock';
import Stock from './components/stock';
import Products from './components/products';
import Navigator from './components/navigator';
import Orders from './components/orders';
import Login from './components/login';
import Logout from './components/logout';
import EditProduct from './components/editProduct';
import Product from './components/product';
import EditDocument from './components/editDocument';
import Documents from './components/documents';
import ImageManagement from './components/product/imageManagement';
import AccessDenied from './components/common/accessDenied';

const Routes = ({history}) => {
  return (
    <div>
      <Navigator history={history}/>
      <div>
        <Route exact path="/" component= {Stocks} />
        <Route exact path="/stocks" component= {Stocks} />
        <Route exact path="/products" component= {Products} />
        <Route exact path="/products/:id" component= {Product} />
        <Route exact path="/products/:id/edit" component= {EditProduct} />
        <Route exact path="/createproduct" component= {EditProduct} />
        <Route exact path="/orders" component= {Orders} />
        <Route exact path="/createstock" component= {EditStock} />
        <Route exact path="/stocks/:id" component= {Stock} />
        <Route exact path="/stocks/:id/edit" component= {EditStock} />
        <Route exact path="/login" component= {Login} />
        <Route exact path="/logout" component= {Logout} />
        <Route exact path="/documents" component= {Documents} />
        <Route exact path="/newdocument" component= {EditDocument} />
        <Route exact path="/draftdocument/:draftId" component= {EditDocument} />
        <Route exact path="/products/:id/imagemanagement" component= {ImageManagement} />
        <Route exact path="/accessdenied" component= {AccessDenied} />
      </div>
    </div>
  )
}

export default Routes;
