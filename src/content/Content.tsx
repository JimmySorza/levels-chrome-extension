import React from 'react';
import { sendMessage } from 'utils';

export const Content = () => {
    React.useEffect(() => {
        sendMessage({ type: 'ACTIVE_PAGE_ACTION' });
    }, []);
    return <div></div>;
};
