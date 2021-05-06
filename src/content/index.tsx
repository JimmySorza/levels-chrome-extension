import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';
import MessageListener from './messageListener';

import { getStore } from './store';
import Main from './Main';
import { setupStorageListener } from './storage';

import { sendMessage } from 'utils';
import { initStore } from './initStore';

const store = getStore();

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

initStore();
/**
 * Setup Storage Listener
 */
setupStorageListener();

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
