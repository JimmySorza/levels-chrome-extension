import { ExtraArguments } from '@redux/@reducers/types';

export const get = () => ({ sendMessage, localStorage }: ExtraArguments) => {
    console.log('~~~~~~ user dat', localStorage('ajs_user_traits').get());
    return {
        type: '@user/GET',
        payload: localStorage('ajs_user_traits').get(),
    };
};
