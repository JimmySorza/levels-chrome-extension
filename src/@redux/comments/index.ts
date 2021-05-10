import { CommentAction } from './actions';
import initialState from './initialState';

export default (state = initialState, action: CommentAction) => {
    let nextState = {};
    switch (action.type) {
        case 'SET_INPUT':
            nextState = {
                ...state,
                isInput: action.payload,
            };
            break;
        case 'SET_ANCHOR':
            nextState = {
                ...state,
                anchor: action.payload,
            };
            break;
        default:
            nextState = state;
    }
    return nextState;
};
