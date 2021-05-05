import { browser, Runtime } from 'webextension-polyfill-ts';
import { Message, Response } from 'types';

/**
 *
 * @param msg
 * @returns
 */
export const sendMessage = (msg: Message, options?: Runtime.SendMessageOptionsType): Promise<Response> => {
    return browser.runtime.sendMessage(msg, options);
};

export default sendMessage;
