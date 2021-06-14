export const asyncTimeOut = (milliseconds: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, milliseconds);
    });
};
