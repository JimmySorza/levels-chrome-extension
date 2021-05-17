import React from 'react';
import { Provider } from 'react-redux';

import { getStore } from './scripts';

export type AppProps = {
    children: React.ReactNode;
};

export const App = ({ children }: AppProps) => {
    const store = getStore();

    return <Provider store={store}>{children}</Provider>;
};

export default App;
