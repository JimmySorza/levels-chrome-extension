import { Dispatch } from 'react';
import { sendMessage } from 'utils';
import { AppState } from '..';

const createSendMessage = ({ getState, dispatch }: { getState: () => AppState; dispatch: Dispatch<any> }) => {
    return sendMessage;
};

export default createSendMessage;
