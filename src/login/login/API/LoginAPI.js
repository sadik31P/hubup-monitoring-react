import {FOSRouter} from "../../FOS/fos.router";
import axios from "axios"
import {User} from "../../sharedCore/entities/User";
import {ProxyCompany} from "../../sharedCore/entities/ProxyCompany";


export class LoginAPI {

    static login(username:string, password:string) : Promise<User> {
        return new Promise((resolve, reject) => {
            let jwt:string;
            let user:User;
            const company:ProxyCompany = global.proxyCompany;


            const unLogged = axios.create({
                baseURL: company.serverUrl,
                headers: {'content-type' : 'application/json'}
            });

            unLogged.post(FOSRouter.getRoute("api_login_check"), { _username: username, _password: password})
                .then((response:any) => {
                    jwt = response.data.token;
                    // console.log("Received JWT : " + jwt);
                    user = new User();
                    user.jwt = jwt;

                    global.jwt = jwt;
                    this.createCookie('jwt', jwt,7);
                    console.log("logged in")

                    resolve();

                })
                .catch((error:any) =>  {
                    console.log("UserAPI::login() : Error in get_user - ", error);
                    reject();
                })
            });
    }

    static createCookie(name,value,days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }
}