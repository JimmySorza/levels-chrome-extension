import { Message } from 'types/message';
import { browser, Runtime, Tabs } from 'webextension-polyfill-ts';

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

        //Add page action listener in browser
        browser.pageAction.onClicked.addListener(this.onClickedExtension);
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
        }
        return true;
    };

    /**
     * Show popup page
     *
     * @param tab
     */
    onClickedExtension = (tab: Tabs.Tab) => {
        browser.pageAction.show(tab.id as number);
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
