import { browser, Runtime, Tabs } from 'webextension-polyfill-ts';
import { wrapStore } from 'webext-redux';

import { Message, SpaceBlockComment, User } from 'types';
import store from '@redux/createStore';
import { AppState } from '@redux';
import { watchDiscussion, watchUsers } from 'utils/database';

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
                this.setupWatchData();
                break;
            }
        }
        return true;
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

    setupWatchData = () => {
        // check users change
        watchUsers(this.onChangeUsers);

        // check comments change
        const { group } = store.getState() as AppState;
        if (group.space_id) {
            watchDiscussion(group.space_id, this.onChangeComments);
        }
    };

    onChangeComments = (comments: SpaceBlockComment) => {
        store.dispatch({
            type: 'SET_COMMENT',
            payload: comments,
        });
    };
    onChangeUsers = (users: { [index: string]: User }) => {
        store.dispatch({
            type: 'SET_ALL_USER',
            payload: users,
        });
    };
}

export const background = new Background();
