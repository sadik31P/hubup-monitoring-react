import {Server} from "./Server";

export class Ping {

    id: number;
    server: Server;
    response: string;
    dateTime: string;
    latency: number;
    responseCode: number;


    constructor(id: number, server: Server, response: string, dateTime: string, latency: number, responseCode: number) {
        this.id = id;
        this.server = server;
        this.response = response;
        this.dateTime = dateTime;
        this.latency = latency;
        this.responseCode = responseCode;
    }

    static mapObject(rawObject: any): Ping{

        return new Ping(rawObject.id, Server.mapObject(rawObject.server), rawObject.response, rawObject.time, rawObject.latency, rawObject.code)
    }

    static mapArray(rawArray: any): Array<Ping> {
        let result = [];
        try {
            for (let o of rawArray) {
                result.push(Ping.mapObject(o));
            }
        } catch (err) {
            console.log(err);
            return result;
        }
        return result;
    }

}