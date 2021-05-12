import axios from 'axios';

export const setupAPICallHooks = () => {
    axios
        .post('https://www.notion.so/api/v3/getSpaces', {
            withCredentials: true,
        })
        .then((res) => console.log('~~~~~ response', res));
};
