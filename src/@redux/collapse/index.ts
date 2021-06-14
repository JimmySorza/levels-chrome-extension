import { CollapseAction } from './actions';
import initialState from './initialState';

export default (state = initialState, action: CollapseAction) => {
    let nextState = {};
    switch (action.type) {
        case 'SET_COLLAPSE':
            nextState = {
                ...state,
                ...action.payload,
            };
            break;
        default:
            nextState = state;
    }
    return nextState;
};
