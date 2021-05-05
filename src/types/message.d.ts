export type MessageType = 'SIGN_IN' | 'SIGN_UP' | 'ACTIVE_PAGE_ACTION';

export type Message = {
    type: MessageType;
    data?: any;
};
