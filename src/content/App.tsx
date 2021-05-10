import { Popover } from '@material-ui/core';
import { useRedux } from '@redux';
import { ModalComment } from 'components/ModalComment';
import React from 'react';
import { Provider } from 'react-redux';
import { sendMessage } from 'utils';
import { getStore } from './scripts/store';

export const App = () => {
    React.useEffect(() => {
        sendMessage({ type: 'ACTIVE_PAGE_ACTION' });
    }, []);

    return (
        <Provider store={getStore()}>
            <ModalComment />
            <div></div>
        </Provider>
    );
};

export default App;
