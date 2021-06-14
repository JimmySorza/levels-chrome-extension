import { Runtime } from 'webextension-polyfill-ts';
import { Message } from 'types/message';
import { Response } from 'types/response';
import { getUserId } from 'utils/getUserId';

export const onRequest = async (msg: Message, sender: Runtime.SendMessageOptionsType): Promise<Response> => {
    try {
        switch (msg.type) {
            case 'CHECK_AUTH':
                const userId = getUserId();
                if (userId) {
                    return {
                        type: 'AUTHENTICATED',
                    };
                }
                return {
                    type: 'UNAUTHORIZED',
                };

            default:
                return { type: 'SUCCESS' };
        }
    } catch (error) {
        throw error;
    }
};

export default onRequest;
