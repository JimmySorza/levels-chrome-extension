import { AppState } from '@redux';

/**
 * Replaces state with initial state
 *
 * @param baseName
 * @param initialDataState
 */
export const createFlushReducer = (baseName: string, initialDataState: any) => (state: AppState, action: any) => {
    switch (action.type) {
        case `${baseName}/FLUSH`:
            return {
                ...state,
                data: initialDataState,
            };

        default:
            return state;
    }
};

export default createFlushReducer;
