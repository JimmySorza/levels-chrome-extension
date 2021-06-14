// Libraries
import React from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import PageSignIn from './SignIn';

export type PageAuthProps = RouteComponentProps;

const PageAuth = (props: PageAuthProps) => {
    const {
        match,
        match: { path, url },
    } = props;

    return (
        <Switch>
            <Route component={PageSignIn} path={`${path}/sign-in`} />
            <Redirect to={`${url}/sign-in`} />
        </Switch>
    );
};

export default PageAuth;
