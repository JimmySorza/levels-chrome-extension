export type ResponseType = 'SUCCESS' | 'FAILED' | 'PENDING' | 'UNAUTHORIZED';

export type Response = {
    type: ResponseType;
    data?: any;
};
