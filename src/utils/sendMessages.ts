import { browser, Runtime, Tabs } from 'webextension-polyfill-ts';
import { Message, Response } from 'types';

/**
 * Send Message to Background Script
 *
 * @param msg
 * @returns
 */
export const sendMessage = (msg: Message, options?: Runtime.SendMessageOptionsType): Promise<Response> => {
    return browser.runtime.sendMessage(msg, options);
};

/**
 * Send Message to Content Script
 */
export const sendMessageWithTab = (tab: Tabs.Tab, msg: Message, options?: Tabs.SendMessageOptionsType) => {
    return browser.tabs.sendMessage(tab.id as number, msg, options);
};
