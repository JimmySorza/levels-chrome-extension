import React from 'react';
import { useDispatch } from 'react-redux';
import { get as getUser } from '@redux/user/actions';

const Main = () => {
    const d = useDispatch();

    React.useEffect(() => {
        d(getUser());
    }, []);

    return <div></div>;
};

export default Main;
