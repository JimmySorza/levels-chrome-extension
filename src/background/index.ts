import { Message } from 'types/message';
import { browser, Runtime, Tabs, WebNavigation } from 'webextension-polyfill-ts';
import { wrapStore } from 'webext-redux';

import store from '@redux/createStore';

wrapStore(store);

/**
 * Define Background script functions
 */
class Background {
    constructor() {
        this.init();
    }

    /**
     * Document Ready
     * @returns {void}
     */
    init = () => {
        console.log('[=====Loaded Background Scripts=====]');

        //When extension installed
        browser.runtime.onInstalled.addListener(this.onInstalled);

        //Add message listener in Browser.
        // @ts-ignore
        browser.runtime.onMessage.addListener(this.onMessage);

        browser.webNavigation.onHistoryStateUpdated.addListener(this.onHistoryStateUpdated);
    };

    //TODO: Listeners

    /**
     * Extension Installed
     */
    onInstalled = () => {
        console.log('[=====Installed Levels Extension=====]');
    };

    /**
     * Message Handler Function from content script and popup page
     *
     * @param message
     * @param sender
     * @param reply
     * @returns
     */
    onMessage = (message: Message, sender: Runtime.MessageSender, reply: Function) => {
        console.log('[=====Received Message=====]', sender, message);
        switch (message.type) {
            case 'ACTIVE_PAGE_ACTION': {
                browser.pageAction.show(sender.tab?.id || 0);
                break;
            }
        }
        return true;
    };

    onHistoryStateUpdated = (details: WebNavigation.OnHistoryStateUpdatedDetailsType) => {
        if (details.url.indexOf('notion.so') >= 0) {
            browser.tabs.executeScript(details.tabId, { file: 'content/content.js', runAt: 'document_end' });
        }
    };

    /**
     * send message
     */
    sendMessage = (tab: Tabs.Tab, msg: Message) => {
        return new Promise((resolve, reject) =>
            // @ts-ignore
            browser.tabs.sendMessage(tab.id as number, msg, (response: Message) => {
                resolve(response);
            })
        );
    };
}

export const background = new Background();
