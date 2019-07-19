import {User} from "./User";

export default class CredentialsStorage {


    static storeProxyCompany(item) {
        return new Promise((resolve, reject) => {
            global.proxyCompany = item;
            // console.log(JSON.stringify(item));

            localStorage.setItem("@cred:proxy_company", JSON.stringify(item));
            resolve()
        })
    }

    static getProxyCompany() {
        return new Promise((resolve, reject) => {
            resolve(JSON.parse(localStorage.getItem("@cred:proxy_company")))
        })
    }


    static removeProxyCompany(){
        return new Promise((resolve) => {
            localStorage.removeItem("@cred:proxy_company");
            resolve()
        })
    }

    static storeUser(item) {
        return new Promise((resolve) => {
            global.user = item;
            global.jwt = item.jwt;
            localStorage.setItem("@cred:user", JSON.stringify(item));
            resolve();
        })
    }

    static removeUser(){
        return new Promise((resolve) => {
            localStorage.removeItem("@cred:user");
            localStorage.removeItem("@cred:username");
            localStorage.removeItem("@cred:password");
            resolve()
        })
    }

    static getUser() : Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(JSON.parse(localStorage.getItem("@cred:user")));
        })
    }

    static getJWT() {
        return new Promise((resolve, reject) => {
            CredentialsStorage.getUser()
                .then((value) => {
                    if(value === null) resolve("");
                    resolve(value.jwt)
                })
        })
    }

    static storeCredentials(username, password) {
        return new Promise((resolve) => {
            localStorage.setItem("@cred:username", username);
            localStorage.setItem("@cred:password", password);
            resolve()
        })
    }

    static getCredentials() : Promise<User> {
        return new Promise((resolve, reject) => {
            resolve([localStorage.getItem("@cred:username"),localStorage.getItem("@cred:password")]);
        })
    }

    static mount() {

        return new Promise((resolve, reject) => {

            CredentialsStorage.getUser().then((u) => {
                global.user = u;
                if(u !== null) {
                    global.jwt = u.jwt;
                } else {
                    global.jwt = "";
                }
                return CredentialsStorage.getProxyCompany();
            }).then((p) => {
                global.proxyCompany = p;
                return CredentialsStorage.getCredentials();
            }).then((c) => {
                global.credentials = c;
                resolve()
            })
        })
    }


  static mountInstant() {
      // global.emitter = new EventEmitter();
      global.language = 'fr';
    }




}