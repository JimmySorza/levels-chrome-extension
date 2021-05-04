/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '@redux/createStore';

import Pages from './pages';

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
