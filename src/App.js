import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Logout from './containers/Auth/Logout/Logout';
import * as actionCreator from './store/actions/index';


const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

const app = (props) => {
  useEffect(() => {
    props.onTryAutoSignIn();
  }, [props]);


  let routes = (
    <Switch>
      <Route path='/auth' component={asyncAuth} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthed) {
    routes = (
      <Switch>
        <Route path='/checkout' component={asyncCheckout} />
        <Route path='/orders' component={asyncOrders} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthed: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actionCreator.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(app);
