import { StorageKey } from 'types';

/**
 * Storage
 *
 * @param storageKey
 * @returns
 */
export function createLocalStorageAccess<State = any>(storageKey: StorageKey | string) {
    return {
        clear: async () => {
            localStorage.removeItem(storageKey);
        },
        get: (): State => {
            const dataLocal = localStorage.getItem(storageKey);
            return dataLocal ? JSON.parse(dataLocal) : {};
        },
        set: (data: State) => {
            localStorage.setItem(
                storageKey,
                JSON.stringify({
                    storage: {
                        updated_at: new Date().toISOString(),
                    },
                    ...data,
                })
            );
        },
    };
}

export default createLocalStorageAccess;
