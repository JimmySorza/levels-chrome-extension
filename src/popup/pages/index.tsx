// Libraries
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './App';
import Auth from './Auth';

const Pages = () => (
    <Switch>
        <Route component={Auth} path="/auth" />
        <Route component={Dashboard} path="/app" />
        <Redirect to="/auth" />
    </Switch>
);

export default Pages;
