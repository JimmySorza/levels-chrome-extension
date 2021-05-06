import localStorage from './localStorage';

export const getUserId = () => {
    return localStorage('ajs_user_id').get();
};
