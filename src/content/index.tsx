// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';
import jquery from 'jquery';

import MessageListener from './scripts/messageListener';
// import { getStore } from './store';
import { setupStorageListener } from './scripts/storage';

import { sendMessage } from 'utils';
import { initStore } from './scripts/initStore';
import { setupMenu } from './scripts/setupMenu';

// const store = getStore();

jquery(() => {
    console.log('[=====DOM State changed=====]');
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
     * Setup Popup Page
     */
    sendMessage({
        type: 'ACTIVE_PAGE_ACTION',
    });

    /**
     * Setup Menu
     */
    setupMenu();
});
