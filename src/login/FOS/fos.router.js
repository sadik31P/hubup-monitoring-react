/* eslint-disable */
import {FosData} from "./fos.data";

declare var Routing: any;

export class FOSRouter {


    static getRoute(route:string, routeParameters:any = null) {


        if(!(route in FosData["routes"])) {
            console.log("FOSRouter()::getRoute() an undefinded route was detected. '" + route + "'  Try to update fos.data.js ?");
            console.log("FOSRouter()::getRoute() given parameters were : ");
            console.log(routeParameters);
            return "undefined_route";
        }



        let routeObject = FosData["routes"][route];

        const UrlElements:Array<URLElement> = [];

        for(let i = 0; i < routeObject.tokens.length; i++ ) {
            const param = routeObject.tokens[i];
            switch(param[0]) {
                case "text":
                    UrlElements.push(new URLElement(param[1], "text"));
                    break;
                case "variable":
                    UrlElements.push(new URLElement(param[3], "variable"));
                    break;
                default:
                    break
            }

        }



        let url = "";
        let canonicalUrl = "";
        while(UrlElements.length) {
            let elm = UrlElements.pop();
            switch(elm.type) {
                case "text" :
                    url = url + elm.value;
                    canonicalUrl = canonicalUrl + elm.value;
                    break;
                case "variable" :
                    canonicalUrl = canonicalUrl + '{' +elm.value + '}';
                    if(elm.value !== "_format") {
                        if(routeParameters != null && elm.value in routeParameters) {
                            url = url + "\/" + routeParameters[elm.value];
                        } else {
                            url = url + "\/" + "undefinded";
                            console.log("FOSRouter()::getRoute()  an undefinded route parameter was detected. (for route " + route + " and parameter " + elm.value);
                            console.log("FOSRouter()::getRoute() given parameters were : ");
                            console.log(routeParameters);
                        }
                    }
                    break;
                default:
                    break;

            }
        }

        const result =  FosData["base_url"] + url;


        // result = ProxyCompany.getApiUrl() + FosData["base_url"] + url;
        // result = ProxyCompany.getApiUrl() + FosData["base_url"] + url;

        return result;
    }
}

export class URLElement {
    value:string;
    type:string;
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
}
