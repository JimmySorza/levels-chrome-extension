import { AnyAction } from 'redux';
import { ReducerOptions, StateWithObjectPayload } from './types';

/**
 * Handles async deletion, flushes data property on success
 * modifies isDeleting of the state
 *
 * @param baseName
 * @param initialState
 * @param options
 */
export function createDeleteReducer<D>(
    baseName: string,
    initialState: StateWithObjectPayload<D>,
    options: ReducerOptions = {}
) {
    return function deleteReducer(state: StateWithObjectPayload<D>, action: AnyAction) {
        const { flushOnError = false } = options;

        switch (action.type) {
            case `${baseName}/DELETE_START`:
                return {
                    ...state,
                    isDeleting: true,
                };

            case `${baseName}/DELETE_ERROR`:
                return {
                    ...state,
                    isDeleting: false,
                    data: flushOnError ? initialState.data : state.data,
                };
            case `${baseName}/DELETE`:
            case `${baseName}/DELETE_SUCCESS`: {
                return {
                    ...state,
                    isDeleting: false,
                    data: undefined,
                };
            }

            default:
                return state;
        }
    };
}

export default createDeleteReducer;
