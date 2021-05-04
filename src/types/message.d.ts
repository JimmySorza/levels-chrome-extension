export type MessageType = 'SIGN_IN' | 'SIGN_UP';

export type Message = {
    type: MessageType;
    data?: any;
};
