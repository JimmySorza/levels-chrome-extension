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
            const blockId: string = action.payload['block_id'];
            console.log('~~~~~~~~ setting comment reducer', action, blockId);
            const originalComments = _.get(state, `data.${blockId}.comments`, []);
            originalComments.push(action.payload);
            _.set(state, `data.${blockId}.comments`, originalComments);
            console.log('~~~~ state', state);
            nextState = {
                ...state,
            };
            return nextState;
        default:
            nextState = state;
    }
    return nextState;
};
