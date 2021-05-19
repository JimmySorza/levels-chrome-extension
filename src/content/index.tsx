import React from 'react';
import ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';
import jquery from 'jquery';

import { sendMessage } from 'utils/sendMessages';

import { setupMenu } from './Menu';
import { getStore, onRequest, initStore, setupStorageListener } from './scripts';
import { setupDiscussion } from './Discussions';
import App from './App';
import { Content } from './Content';

import './App.scss';

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);

const store = getStore();

jquery(() => {
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
        ReactDOM.render(
            <App>
                <Content />
            </App>,
            app
        );
    });
});
