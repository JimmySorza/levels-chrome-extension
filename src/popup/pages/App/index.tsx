// Libraries
import React from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import PageHome from './Home';

export type PageAppProps = RouteComponentProps;

const PageApp = (props: PageAppProps) => {
    const {
        match,
        match: { path, url },
    } = props;

    return (
        <Switch>
            <Route component={PageHome} path={`${path}/home`} />
            <Redirect to={`${url}/home`} />
        </Switch>
    );
};

export default PageApp;
