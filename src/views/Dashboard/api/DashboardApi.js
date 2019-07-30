import {Server} from "../entities/Server";
import {RESTManager} from "../../../login/API/RESTManager";
import {FOSRouter} from "../../../login/FOS/fos.router";
import {Ping} from "../entities/Ping";


export default class dashboardApi {

    static getServers() : Promise<Server>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_server_get_servers'))
                .then((response: any) => { resolve(Server.mapArray(response.data)) })
                .catch((error:any) => {
                    console.log("dashboardApi::getServers() :: " + error);
                    reject("dashboardApi::getServers() :: " + error);
                })
        });
    };

    static getPings() : Promise<Ping>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_ping_get_pings'))
                .then((response: any) => { resolve(Ping.mapArray(response.data)) })
                .catch((error:any) => {
                    console.log("dashboardApi::getPings() :: " + error);
                    reject("dashboardApi::getPings() :: " + error);
                })
        });
    };

    static getTotalRunningServers() : Promise<>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_server_get_running_servers_count'))
                .then((response: any) => { resolve(response.data) })
                .catch((error:any) => {
                    console.log("dashboardApi::getTotalRunningServers() :: " + error);
                    reject("dashboardApi::getTotalRunningServers() :: " + error);
                })
        });
    };


    static getTotalServers() : Promise<>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_server_get_servers_count'))
                .then((response: any) => { resolve(response.data) })
                .catch((error:any) => {
                    console.log("dashboardApi::getTotalServers() :: " + error);
                    reject("dashboardApi::getTotalServers() :: " + error);
                })
        });
    };

    static getTotalDownServers() : Promise<>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_server_get_down_servers_count'))
                .then((response: any) => { resolve(response.data) })
                .catch((error:any) => {
                    console.log("dashboardApi::getTotalDownServers() :: " + error);
                    reject("dashboardApi::getTotalDownServers() :: " + error);
                })
        });
    };


    static getLaggingServers() : Promise<>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_server_get_slow_servers_count'))
                .then((response: any) => { resolve(response.data) })
                .catch((error:any) => {
                    console.log("dashboardApi::getLaggingServers() :: " + error);
                    reject("dashboardApi::getLaggingServers() :: " + error);
                })
        });
    };

    static getCeoBusUnparsedFiles() : Promise<>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_ceobus_get_files_count'))
                .then((response: any) => { resolve(response.data) })
                .catch((error:any) => {
                    console.log("dashboardApi::getCeoBusUnparsedFiles() :: " + error);
                    reject("dashboardApi::getCeoBusUnparsedFiles() :: " + error);
                })
        });
    };

    static getActiveUsersForToday() : Promise<>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_server_get_todays_users'))
                .then((response: any) => { resolve(response.data) })
                .catch((error:any) => {
                    console.log("dashboardApi::getActiveUsersForToday() :: " + error);
                    reject("dashboardApi::getActiveUsersForToday() :: " + error);
                })
        });
    };

    static getWeeklyDownTimeForAllServers(dateTime) : Promise<>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_ping_get_weekly_down_servers',{dateTime:dateTime}))
                .then((response: any) => { resolve(response.data) })
                .catch((error:any) => {
                    console.log("dashboardApi::getWeeklyDownTimeForAllServers() :: " + error);
                    reject("dashboardApi::getWeeklyDownTimeForAllServers() :: " + error);
                })
        });
    };

    static getMonthlyDownTimeForServer(dateTime, server) : Promise<>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_ping_get_daily_total_stats',{dateTime:dateTime, server: server}))
                .then((response: any) => { resolve(response.data) })
                .catch((error:any) => {
                    console.log("dashboardApi::getMonthlyDownTimeForServer() :: " + error);
                    reject("dashboardApi::getMonthlyDownTimeForServer() :: " + error);
                })
        });
    };

    static getDailyDownTimeForServer(dateTime, server) : Promise<>  {
        return new Promise((resolve, reject) => {
            RESTManager.get(FOSRouter.getRoute('api_ping_get_hourly_stats',{dateTime:dateTime, server: server}))
                .then((response: any) => { resolve(response.data) })
                .catch((error:any) => {
                    console.log("dashboardApi::getMonthlyDownTimeForServer() :: " + error);
                    reject("dashboardApi::getMonthlyDownTimeForServer() :: " + error);
                })
        });
    };



}