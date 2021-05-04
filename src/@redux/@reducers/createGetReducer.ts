import { AnyAction } from 'redux';
import { DefaultState, ReducerOptions } from './types';

/**
 * State data will be replaced with new payload
 * modifies isLoading of the state
 *
 * @param baseName
 * @param initialState
 * @param options
 */
export function createGetReducer<D>(baseName: string, initialState: DefaultState<D>, options: ReducerOptions = {}) {
    return function getReducer(state: DefaultState<D>, action: AnyAction) {
        const { flushOnError = false, flushOnStart = false } = options;

        switch (action.type) {
            case `${baseName}/GET_START`:
                return {
                    ...state,
                    isLoading: true,
                    isInitLoading: false,
                    data: flushOnStart ? initialState.data : state.data,
                };

            case `${baseName}/GET_ERROR`:
                return {
                    ...state,
                    isLoading: false,
                    data: flushOnError ? initialState.data : state.data,
                };
            case `${baseName}/GET_SUCCESS`:
                return {
                    ...state,
                    isLoading: false,
                    data: action.payload,
                };

            default:
                return state;
        }
    };
}

export default createGetReducer;
