import ext from "./ext";

// @ts-ignore
export default ext.storage.sync ? ext.storage.sync : ext.storage.local;
