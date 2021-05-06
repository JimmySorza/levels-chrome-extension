import { AnyAction } from 'redux';
import { ReducerOptions, StateWithObjectPayload } from './types';

/**
 * Handles update actions for an object state
 * Partial data will be merged with the old state
 * modifies isUpdating of the state
 *
 * @param baseName
 * @param initialState
 * @param options
 */
export function createUpdateReducer<D>(
    baseName: string,
    initialState: StateWithObjectPayload<D>,
    options: ReducerOptions = {}
) {
    return function deleteReducer(state: StateWithObjectPayload<D>, action: AnyAction & { payload: D }) {
        const { flushOnError = false } = options;

        switch (action.type) {
            case `${baseName}/UPDATE_START`:
                return {
                    ...state,
                    isDeleting: true,
                };

            case `${baseName}/UPDATE_ERROR`:
                return {
                    ...state,
                    isDeleting: false,
                    data: flushOnError ? initialState.data : state.data,
                };
            case `${baseName}/UPDATE`:
            case `${baseName}/UPDATE_SUCCESS`: {
                return {
                    ...state,
                    isDeleting: false,
                    data: {
                        ...state.data,
                        ...action.payload,
                    },
                };
            }

            default:
                return state;
        }
    };
}

export default createUpdateReducer;
