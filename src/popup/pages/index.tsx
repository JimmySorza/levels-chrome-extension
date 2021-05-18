// Libraries
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { useRedux } from '@redux';
import Dashboard from './App';
import Auth from './Auth';

const Pages = () => {
    const userState = useRedux('user');

    return (
        <Switch>
            <Route component={Auth} path="/auth" />
            <Route component={Dashboard} path="/app" />
            <Redirect to={userState.id ? '/app' : '/auth'} />
        </Switch>
    );
};

export default Pages;
