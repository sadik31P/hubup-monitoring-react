import axios from "axios"

export class RESTManager {

    static IS_DEBUG: boolean = true;

    /**
     * @returns {AxiosInstance}
     */
    static getRESTInstance() : axios.AxiosInstance|null {
        if(global.jwt){
            return axios.create({
                baseURL: global.proxyCompany.serverUrl,
                headers: {'content-type' : 'application/json', 'Authorization' : 'Bearer ' + global.jwt }
            });
        }
        else{
            return null;
        }

    }

    static get(url:string) : Promise<any> {
        return new Promise((resolve, reject) => {
            RESTManager.debug(url);

            if(RESTManager.getRESTInstance() !== null){
                RESTManager.getRESTInstance().get(url)
                    .then(result => resolve(result))
                    .catch(error => {
                        RESTManager.errorInterceptor(error);
                        reject(error);
                    });
            }
            else{
                reject('[REST MANAGER] --> Local storage properties are no correctly set, must relog')
            }

        });
    }

    static post(url:string, data:any) : Promise<any> {
        return new Promise((resolve, reject) => {
            RESTManager.debug(url);

            if(RESTManager.getRESTInstance() !== null){
                RESTManager.getRESTInstance().post(url,data)
                    .then(result => resolve(result))
                    .catch(error => {
                        RESTManager.errorInterceptor(error);
                        reject(error);
                    })
            }
            else{
                reject('[REST MANAGER] --> Local storage properties are no correctly set, must relog')
            }

        })
    }




    static put(url:string, data:any) : Promise<any> {
        return new Promise((resolve, reject) => {
            RESTManager.debug(url);

            if(RESTManager.getRESTInstance() !== null){
                RESTManager.getRESTInstance().put(url,data)
                    .then(result => resolve(result))
                    .catch(error => {
                        RESTManager.errorInterceptor(error);
                        reject(error);
                    })
            }
            else{
                reject('[REST MANAGER] --> Local storage properties are no correctly set, must relog')
            }

        })
    }


    static del(url:string, data:any) : Promise<any> {
        return new Promise((resolve, reject) => {
            RESTManager.debug(url);

            if(RESTManager.getRESTInstance() !== null){
                RESTManager.getRESTInstance().delete(url)
                    .then(result => resolve(result))
                    .catch(error => {
                        RESTManager.errorInterceptor(error);
                        reject(error);
                    })
            }
            else{
                reject('[REST MANAGER] --> Local storage properties are no correctly set, must relog')
            }


        })
    }

    static postFile(route: string, uri:string,name:string,type:string) {
        return new Promise((resolve,reject) =>  {
            const file = {
                uri,             // e.g. 'file:///path/to/file/image123.jpg'
                name,            // e.g. 'image123.jpg',
                type             // e.g. 'image/jpg'
            };

            const body = new FormData();
            body.append('attachment', file);

            fetch(route, {
                method: 'POST',
                body
            }).then((response:any) => {
                resolve(response);
            }).catch((error:any) => {
                reject(error);
            })
        })
    }


    /**
     *
     */
    static debug(route:string) : route {
        if(RESTManager.IS_DEBUG) {
            // console.log(global.proxyCompany.serverUrl + route)
        }
    }





    static errorInterceptor(error) : void {

        console.log("" +
            "                _____________________\n" +
            "               (<$$$$$$>#####<::::::>)\n" +
            "            _/~~~~~~~~~~~~~~~~~~~~~~~~~\\\n" +
            "          /~                             ~\\\n" +
            "        .~                                 ~\n" +
            "    ()\\/_____                           _____\\/()\n" +
            "   .-''      ~~~~~~~~~~~~~~~~~~~~~~~~~~~     ``-.\n" +
            ".-~              __________________              ~-.\n" +
            "`~~/~~~~~~~~~~~~TTTTTTTTTTTTTTTTTTTT~~~~~~~~~~~~\\~~'\n" +
            "| | | #### #### || | | | [] | | | || #### #### | | |\n" +
            ";__\\|___________|++++++++++++++++++|___________|/__;\n" +
            " (~~====___________________________________====~~~)\n" +
            "  \\------_____________[ERROR]____________-------/\n" +
            "     |      ||         ~~~~~~~~       ||      |\n" +
            "      \\_____/                          \\_____/");


        if (error.response) {
            console.log("============================DATA=================================");
            console.log(error.response.data);
            console.log("===========================STATUS================================");
            console.log(error.response.status);
            console.log("===========================HEADERS===============================");
            console.log(error.response.headers);
            console.log("============================OVER=================================");


           if(error.response.status === 401 || error.response.status === '401'){
               global.emitter.emit('AUTHGUARD_MUST_LOGOUT');
               // global.emitter.emit('showSnackBar',
               //     {
               //         title:Texts.getText('post_notification_success_snackbar_title'),
               //         body:Texts.getText('post_notification_success_snackbar_body'),
               //         type:'success'
               //     });
               global.emitter.emit('wipeJWT');
           }

        }
    }
}