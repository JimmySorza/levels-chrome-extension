import { ThemeAction } from './actions';
import initialState from './initialState';

export default (state = initialState, action: ThemeAction) => {
    let nextState = {};
    switch (action.type) {
        case 'GET_THEME':
            nextState = {
                ...action.payload,
            };
            break;
        default:
            nextState = state;
    }
    return nextState;
};
