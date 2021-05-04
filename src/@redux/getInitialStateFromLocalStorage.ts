import { localStorage } from 'utils';
import { initialState } from './initialState';

/**
 * As an initial state,
 * we are merging default initial state and data from the localstorage first
 */

const initReducerState = {
    isInitLoading: true,
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
};

export default () => ({
    ...initialState,
});
