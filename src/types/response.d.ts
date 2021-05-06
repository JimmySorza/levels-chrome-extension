export type ResponseType = 'SUCCESS' | 'FAILED' | 'PENDING' | 'UNAUTHORIZED' | 'AUTHENTICATED';

export type Response = {
    type: ResponseType;
    data?: any;
};
