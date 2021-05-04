export function createLocalStorageAccess<State>(storageProp: string) {
    const propId = `levels___${storageProp}`;
    return {
        clear: async () => {
            localStorage.removeItem(propId);
        },
        get: (): State => {
            const dataLocal = localStorage.getItem(propId);
            return dataLocal ? JSON.parse(dataLocal) : {};
        },
        set: (data: State) => {
            localStorage.setItem(
                propId,
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
