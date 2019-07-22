export class Server {

    id: number;
    address: string;
    name: string;
    description: string;


    constructor(id: number, address: string, name: string, description: string) {
        this.id = id;
        this.address = address;
        this.name = name;
        this.description = description;
    }

    static mapObject(rawObject: any): Server{

        return new Server(rawObject.id, rawObject.address, rawObject.name, rawObject.description);
    }

    static mapArray(rawArray: any): Array<Server> {
        let result = [];
        try {
            for (let o of rawArray) {
                result.push(Server.mapObject(o));
            }
        } catch (err) {
            console.log(err);
            return result;
        }
        return result;
    }

    prepare(){
        return {
            id: this.id,
            address: this.address,
            name: this.name,
            description: this.description,
        };
    }

}