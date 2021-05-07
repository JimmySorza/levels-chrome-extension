import { Store } from 'webext-redux';

let store: Store;

export const getStore = () => {
    if (store) {
        return store;
    }
    store = new Store();
    return store;
};
