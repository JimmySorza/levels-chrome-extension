import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '@redux/createStore';

import { ext } from 'utils';
import MessageListener from './messageListener';

// @ts-ignore
ext.runtime.onMessage.addListener(MessageListener);

export const Main = () => {
    return (
        <Provider store={store}>
            <div className="my-extension"></div>
        </Provider>
    );
};

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);

ReactDOM.render(<Main />, app);
