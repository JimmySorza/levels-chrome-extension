export type MessageType = 'SIGN_IN' | 'SIGN_UP' | 'ACTIVE_PAGE_ACTION' | 'CHECK_AUTH' | 'GET_USER';

export type Message = {
    type: MessageType;
    data?: any;
};
