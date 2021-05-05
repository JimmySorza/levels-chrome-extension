import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '@redux/createStore';

import { browser } from 'webextension-polyfill-ts';
import MessageListener from './messageListener';
import { sendMessage } from 'utils';

// @ts-ignore
browser.runtime.onMessage.addListener(MessageListener);

export const Main = () => {
    React.useEffect(() => {
        sendMessage({ type: 'ACTIVE_PAGE_ACTION' });
    }, []);
    return (
        // <Provider store={store}>
        <div className="my-extension"></div>
        // </Provider>
    );
};

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);

ReactDOM.render(<Main />, app);
