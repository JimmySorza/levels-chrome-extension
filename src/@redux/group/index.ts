import { GroupAction } from './actions';
import initialState from './initialState';

export default (state = initialState, action: GroupAction) => {
    let nextState = {};
    switch (action.type) {
        case 'GET_GROUP':
            nextState = {
                ...action.payload,
            };
            break;
        default:
            nextState = state;
    }
    return nextState;
};
