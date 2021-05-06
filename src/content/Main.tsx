import React from 'react';

import { useRedux } from '@redux';

const Main = () => {
    const userSate = useRedux('user');

    return <div></div>;
};

export default Main;
