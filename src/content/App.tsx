import React from 'react';
import { Provider } from 'react-redux';
import { Theme } from '@material-ui/core';
import { ThemeProvider, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { AppState } from '@redux';
import { getStore } from './scripts';

export type AppProps = {
    children: React.ReactNode;
};

export const App = ({ children }: AppProps) => {
    const store = getStore();
    const appState: AppState = store.getState();

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: appState?.theme?.mode || 'light',
                },
            }),
        [appState]
    );

    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </Provider>
    );
};

export default App;
