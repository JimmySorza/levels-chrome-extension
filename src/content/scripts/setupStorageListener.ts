import { initStore } from './initStore';

export const setupStorageListener = () => {
    window.addEventListener('storage', initStore);
};
