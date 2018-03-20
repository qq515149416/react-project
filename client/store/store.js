import AppStoreClass  from "./app-store.js";

export const AppStore = AppStoreClass;
export default {
    AppStore,
}
export const createStoreMap = () => {
    return {
        appStore : new AppStore()
    }
}