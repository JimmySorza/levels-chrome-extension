import ext from "./ext";

export type MSG_TYPE = "AUTH" | "COMMENT";

/**
 *
 * @param msgType
 * @param message
 * @returns
 */
export const sendMessage = async (msgType: MSG_TYPE, message: any): Promise<any> => {
    const msg = {
        msgType,
        ...message,
    };
    console.log("===== Sending Message => ", msg);
    return new Promise((resolve, reject) => {
        try {
            ext.runtime.sendMessage(msg, (response: any) => {
                resolve(response);
            });
        } catch (e) {
            console.log(" SendMessage Failed => ", e);
            reject(e);
        }
    });
};

export default sendMessage;
