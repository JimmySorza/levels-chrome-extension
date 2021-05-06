import { AnyAction } from 'redux';
import { StateWithArrayPayload, ReducerOptions } from './types';

type Identity = string | number;

/**
 * Removes item from the data which is an array of objects with "id" property
 * modifies isDeleting of the state
 *
 * @param baseName
 * @param initialState
 * @param options
 */
export function createDeleteInArrayReducer<D extends { id: Identity }>(
    baseName: string,
    initialState: StateWithArrayPayload<D>,
    options: ReducerOptions = {}
) {
    return function deleteInArrayReducer(state: StateWithArrayPayload<D>, action: AnyAction & { payload: Identity }) {
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
                    data: state.data.filter((item) => item.id !== action.payload),
                };
            }

            default:
                return state;
        }
    };
}

export default createDeleteInArrayReducer;
