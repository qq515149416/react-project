import {
    observable,
    computed,
    action
} from "mobx";

export class AppStore {
    @observable name = "test";
    @observable num = 0;
    @computed get msg() {
        return `${this.name} num is ${this.num}`;
    }
    @action add() {
        this.num += 1;
    }
}
const appStore = new AppStore();
export default appStore;