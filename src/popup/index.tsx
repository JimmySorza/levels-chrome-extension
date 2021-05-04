/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { createStore } from '@redux';

import Pages from './pages';

const history = createBrowserHistory();
const store = createStore(undefined, history);

export const Main = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Pages />
                </div>
            </BrowserRouter>
        </Provider>
    );
};

ReactDOM.render(<Main />, document.getElementById('root'));
