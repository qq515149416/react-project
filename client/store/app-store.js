import {
    observable,
    computed,
    action
} from "mobx";

export default class AppStore {
    constructor({name,num}={name: "test",num: 0}) {
        this.name = name;
        this.num = num;
    }
    @observable name;
    @observable num;
    @computed get msg() {
        return `${this.name} num is ${this.num}`;
    }
    @action add() {
        this.num += 1;
    }
    toJson() {
        return {
            name: this.name,
            num: this.num,
        }
    }
}