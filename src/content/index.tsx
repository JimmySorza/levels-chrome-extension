import { browser } from 'webextension-polyfill-ts';
import jquery from 'jquery';

import { sendMessage } from 'utils';

import { setupMenu } from './Menu';
import { setupAPICallHooks, getStore, onRequest, initStore, setupStorageListener } from './scripts';
import { setupDiscussion } from './Discussions';

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
    });
});
