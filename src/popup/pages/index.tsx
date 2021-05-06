// Libraries
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { useRedux } from '@redux';
import { get as getUser } from '@redux/user/actions';
import Dashboard from './App';
import Auth from './Auth';

const Pages = () => {
    const userState = useRedux('user');
    console.log('~~~~~~ userState', userState);

    return (
        <Switch>
            <Route component={Auth} path="/auth" />
            <Route component={Dashboard} path="/app" />
            <Redirect to="/auth" />
        </Switch>
    );
};

export default Pages;
