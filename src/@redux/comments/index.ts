import { CommentAction } from './actions';
import initialState from './initialState';
import _ from 'lodash';

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
        case 'SET_COMMENT':
            nextState = {
                ...state,
                data: action.payload,
            };
            break;
        default:
            nextState = state;
    }
    return nextState;
};
