import ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';
import jquery from 'jquery';

import { sendMessage } from 'utils';

import { setupMenu } from './Menu';
import { setupAPICallHooks, getStore, onRequest, initStore, setupStorageListener } from './scripts';
import { setupDiscussion } from './Discussions';

// const app = document.createElement('div');
// app.id = 'my-extension-root';
// document.body.appendChild(app);

const store = getStore();

jquery(() => {
    setupAPICallHooks();

    /**
     * Setup Storage Listener
     */
    setupStorageListener();

    /**
     * Set up Message Listener
     */
    browser.runtime.onMessage.addListener(onRequest);

    /**
     * Setup Popup Page
     */
    sendMessage({
        type: 'ACTIVE_PAGE_ACTION',
    });

    /**
     * Setup Menu
     */
    setupMenu();

    store.ready().then(() => {
        initStore();
        setupDiscussion();
        // ReactDOM.render(<App />, app);
    });
});
