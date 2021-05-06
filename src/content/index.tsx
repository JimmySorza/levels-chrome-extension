import React from 'react';
import ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';
import MessageListener from './messageListener';

import { Provider } from 'react-redux';

import { Store } from 'webext-redux';
import Main from './Main';

import { sendMessage } from 'utils';

const store = new Store();
const App = () => {
    React.useEffect(() => {
        sendMessage({ type: 'ACTIVE_PAGE_ACTION' });
    }, []);

    return (
        <Provider store={store}>
            <Main></Main>
        </Provider>
    );
};

/**
 * Set up Message Listener
 */
browser.runtime.onMessage.addListener(MessageListener);

/**
 * Set up React Dom
 */
const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);

store.ready().then(() => {
    ReactDOM.render(<App />, app);
});
