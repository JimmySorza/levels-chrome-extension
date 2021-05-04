import { browser } from 'webextension-polyfill-ts';
import { Message, Response } from 'types/index';

/**
 *
 * @param msg
 * @returns
 */
export const sendMessage = (msg: Message): Promise<Response> => {
    return new Promise((resolve, reject) => {
        try {
            // @ts-ignore
            browser.runtime.sendMessage(msg, (response: Response) => {
                resolve(response);
            });
        } catch (e) {
            console.log('SendMessage Failed => ', e);
            reject({
                type: 'FAILED',
            });
        }
    });
};

export default sendMessage;
