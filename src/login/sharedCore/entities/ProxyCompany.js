// @flow

export class ProxyCompany {

    id:number;
    name:string;
    shortName:string;
    serverUrl:string;
    resetPasswordUrl:string;
    tag:string;
    parameters:Array<>;
    defaultLat:number;
    defaultLng:number;
    toBeChecked: boolean;

    constructor(id: number, name: string, shortName: string, serverUrl:string, resetPasswordUrl:string, tag: string) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.serverUrl = serverUrl;
        this.resetPasswordUrl = resetPasswordUrl;
        this.tag = tag;
    }

    /**
     *
     */
    serialize() : any {

        return {
            name: this.name,
            serverUrl: this.serverUrl,
            resetPasswordUrl: this.resetPasswordUrl,
            tag: this.tag,
            shortName: this.shortName,
            // attachments: ProxyCompanyAttachment.serializeArray(this.proxyCompanyAttachments),
            // parameters: ProxyParameter.serializeArray(this.parameters)
            defaultLat: this.defaultLat,
            defaultLng: this.defaultLng,
            toBeCheck: this.toBeChecked
        };
    }

    /**
     *
     * @param o
     * @returns {ProxyCompany}
     */
    static unSerialize(o:any) : ProxyCompany|null {
        try {
            let pc =  new ProxyCompany(o.id, o.name, o.shortName, o.serverUrl, o.resetPasswordUrl, o.tag);
            return pc;
        } catch(error) {
            console.log("ProxyCompany::unSerialize() : ");
            console.log(error);
            return null;
        }
    }

    static mapProxyCompany(rawObject:any) : ProxyCompany {
        try {

            let pc = new ProxyCompany(rawObject.id, rawObject.name, rawObject.short_name, rawObject.server_url, rawObject.reset_password_url, rawObject.tag);

            if(rawObject.default_lat && rawObject.default_lng){
                pc.defaultLat = rawObject.default_lat;
                pc.defaultLng = rawObject.default_lng;
            }
            return pc;

        } catch(error) {
            console.log(error);
        }
    }

    hasFlexo() {
        return this.storedCompanyHasParameterType("has_flexo");
    }

    hasAmplitudeLog() {

        // console.log(global.proxyCompany.parameters);

        return (!this.storedCompanyHasParameterType("server_type") ||
        (this.storedCompanyHasParameterType("server_type") && this.getStoredProxyCompanyParameter("server_type") !== 'dev'));
    }

    storedCompanyHasParameterType(parameter : string) {

        try {
            if(global.proxyCompany.parameters && global.proxyCompany.parameters.length) {

                for(let p of global.proxyCompany.parameters) {
                    if(p.type === parameter){
                        return true;
                    }
                }
            }
            return false;
        }
        catch(e) {
            return false;
        }
    }

    getStoredProxyCompanyParameter(parameter : string) {
        try {
            if(global.proxyCompany.parameters && global.proxyCompany.parameters.length) {

                for(let p of global.proxyCompany.parameters) {
                    if(p.type === parameter){
                        return p.content;
                    }
                }
            }
            return null;
        }
        catch(e) {
            return null;
        }
    }

    setAdditonalParams(toBeChecked, lat, lng){
        this.toBeChecked = toBeChecked;
        this.defaultLng = lng;
        this.defaultLat = lat;
    }

}