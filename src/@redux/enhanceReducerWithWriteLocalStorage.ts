import { localStorage } from 'utils';
import { AnyAction, Reducer } from 'redux';

/**
 * Whenever there is an action fired and the action name start's with "name" param,
 * this wrapper will save the state to the localStorage
 *
 * Usage:
 * import enhanceReducerWithWriteLocalStorage from '../../somewhere'
 *
 * const myReducer = (state, action) => nextState
 * const enhancedReducer = enhanceReducerWithWriteLocalStorage('@myReducer')(myReducer)
 */

export function createEnhancedReducer(name: string) {
    return function withReducer(reducer: Reducer) {
        type State = ReturnType<ReturnType<typeof reducer>>;

        return function withLocalStorageSave(state: State, action: AnyAction): State {
            const nextState = reducer(state, action);
            if (action.type.startsWith(name)) {
                localStorage(name).set(nextState);
            }
            return nextState;
        };
    };
}

export default createEnhancedReducer;
