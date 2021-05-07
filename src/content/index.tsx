// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';
import jquery from 'jquery';

import MessageListener from './messageListener';
// import { getStore } from './store';
import { setupStorageListener } from './storage';

import { sendMessage } from 'utils';
import { initStore } from './initStore';

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

    sendMessage({
        type: 'ACTIVE_PAGE_ACTION',
    });
});
