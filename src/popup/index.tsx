/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Store } from 'webext-redux';

import Pages from './pages';

const store = new Store();

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

store.ready().then(() => {
    ReactDOM.render(<Main />, document.getElementById('root'));
});
