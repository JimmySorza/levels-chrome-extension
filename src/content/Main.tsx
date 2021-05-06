import React from 'react';
import { useDispatch, useStore, connect } from 'react-redux';
import { get, get as getUser } from '@redux/user/actions';
import { useRedux } from '@redux';

const Main = () => {
    const store = useStore();

    const userSate = useRedux('user');
    console.log('~~~~ userstate', userSate);

    React.useEffect(() => {
        get(store.dispatch);
    }, []);

    return <div></div>;
};

export default Main;
