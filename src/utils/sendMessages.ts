import ext from './ext';
import { Message, Response } from 'types/index';

/**
 *
 * @param msg
 * @returns
 */
export const sendMessage = async (msg: Message): Promise<Response> => {
    return new Promise((resolve, reject) => {
        try {
            // @ts-ignore
            ext.runtime.sendMessage(msg, (response: Response) => {
                resolve(response);
            });
        } catch (e) {
            console.log('SendMessage Failed => ', e);
            reject(e);
        }
    });
};

export default sendMessage;
