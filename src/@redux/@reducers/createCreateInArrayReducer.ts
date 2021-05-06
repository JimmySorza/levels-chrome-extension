import { AnyAction } from 'redux';
import { StateWithArrayPayload, ReducerOptions } from './types';

/**
 * Appends new object from the payload to the data array
 * modifies isCreating of the state
 *
 * @param baseName
 * @param initialState
 * @param options
 */
export function createCreateInArrayReducer<D>(
    baseName: string,
    initialState: StateWithArrayPayload<D>,
    options: ReducerOptions = {}
) {
    return function createInArrayReducer(state: StateWithArrayPayload<D>, action: AnyAction & { payload?: D[] }) {
        const { flushOnError = false } = options;

        switch (action.type) {
            case `${baseName}/CREATE_START`:
                return {
                    ...state,
                    isCreating: true,
                };

            case `${baseName}/CREATE_ERROR`:
                return {
                    ...state,
                    isCreating: false,
                    data: flushOnError ? initialState.data : state.data,
                };
            case `${baseName}/CREATE`:
            case `${baseName}/CREATE_SUCCESS`: {
                const newCreate = !Array.isArray(action.payload) ? [action.payload] : action.payload;
                return {
                    ...state,
                    isCreating: false,
                    data: [...state.data, ...newCreate],
                };
            }

            default:
                return state;
        }
    };
}

export default createCreateInArrayReducer;
