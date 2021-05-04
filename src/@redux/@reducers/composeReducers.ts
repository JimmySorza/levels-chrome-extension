import { AnyAction, Reducer } from 'redux';

function getState<State, A extends AnyAction = AnyAction>(
    reducers: Reducer<State, A>[],
    index: number,
    state: State,
    action: A
): State {
    if (reducers.length > index) {
        return getState(reducers, index + 1, reducers[index](state, action), action);
    }

    return state;
}

export function composeReducers<S, A extends AnyAction = AnyAction>(initialState: S) {
    return function withReducers(...reducers: Reducer<S, A>[]) {
        return function wrappingReducer(state: S = initialState, action: A) {
            if (
                action.payload &&
                action.payload.status &&
                action.payload.status === 403 &&
                action.payload.redirect === true
            ) {
                window.location.replace('/app');
            }
            return getState<S, A>(reducers, 0, state, action);
        };
    };
}

export default composeReducers;
