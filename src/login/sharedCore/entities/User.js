// @flow


export class User {


    id:number;
    email:any;
    roles:Array<string>;
    firstName:string;
    lastName:any;
    matricule:string;
    jwt:string;
    abstractRoles:Array<string>;
    thumbnail:string;
    username:string;
    maxUuidAmount:number;

    //duty related
    dutyDeviceOnBoarded:boolean = false;
    dutyDevice:DutyDevice;
    dutyDeviceIsThisOne:boolean = false;
    onDuty:boolean = false;

    //users devices
    uuids:Array<Uuid>;

    lastLogin:any;

    //Front
    selected:boolean=false;

    static USER_ACCESS_OPTION = [
        {name:"Utilisateur mobile", value:"ROLE_DRIVER"},
        {name:"Utilisateur portail", value:"ROLE_SUPER_USER"},
        {name:"Administrateur", value:"ROLE_ADMIN"},
    ];

    constructor(id: number, email: any, roles: Array<string>, firstName: string, lastName: any, matricule: string) {
        this.id = id;
        this.email = email;
        this.roles = roles;
        this.firstName = firstName;
        this.lastName = lastName;
        this.matricule = matricule;
    }

    dump() {
        try {
            // console.log("======== " + this.firstName + ' ' + this.lastName + ' [' + ((this.matricule !== "" || this.matricule == null) ? this.matricule : 'NO_MATRICULE') + '] (ID='+ this.id + ') ' + " ===========");
            console.log(
                "= email : " + this.email);
            if(this.roles && this.roles.length) {
                console.log("= roles (native) : ");
                for(let role of this.roles) {
                    console.log("=   - " + role);
                }
            } else {
                console.log("= roles : none.");
            }
            if(this.abstractRoles && this.abstractRoles.length) {
                console.log("= roles (abstract) : ");
                for(let role of this.abstractRoles) {
                    console.log("=  - " + role);
                }
            } else {
                console.log("= roles (abstract) : none");
            }
            if(global.proxyCompany) {
                console.log("= server : " + global.proxyCompany.tag + " on URL " + global.proxyCompany.serverUrl);
            }
            if(this.hasAbstractRole("DUTY_ASSIGNEE_ROLE_GROUP")) {
                console.log("= This user is a duty assignee : ");
                console.log("=  on boarding done : " + (this.dutyDeviceOnBoarded ? 'YES' : 'NO') );
                console.log("=  device recognized : " + (this.dutyDeviceIsThisOne ? 'YES' : 'NO') );
            }
        } catch(error) {
            console.log("An error happened. cound not dump user.");
        }
    }

    static create() {
        return new User(-1, "", [], "", "", "");
    }

    isSuperUser() : boolean {
        return this.hasRole("ROLE_SUPER_USER") || this.hasRole("ROLE_ADMIN");
    }

    static staticIsSuperUser(user) : boolean {
        return (user.roles.indexOf("ROLE_ADMIN") !== -1 || user.roles.indexOf("ROLE_SUPER_USER") !== -1)
    }

    isAdmin() : boolean {
        return this.hasRole("ROLE_ADMIN");
    }

    static staticIsAdmin(user) : boolean {
        return user.roles.indexOf("ROLE_ADMIN") !== -1
    }

    static staticIsSuperAdmin(user) : boolean {
        return user.roles.indexOf("ROLE_SUPER_ADMIN") !== -1
    }

    hasSchedulerAccess() : boolean {
        return (this.hasAbstractRole("ROLE_GROUP_ACCESS_WEBPORTAL") || this.hasAbstractRole("ROLE_NATIVE_SCHEDULER_PROVIDER"));
    }

    /**
     * CE SONT LES ROLES DE BASE DU FIREWALL SYMFONY. NO MISTAKE WITH ABSTRACT ROLES GUYZ PLZPLZPLZPLZPLZPLZPLZPLZ
     */
    hasRole(role:string) : boolean {
        return (this.roles.indexOf(role) !== -1);
    }

    /**
     * CE SONT LES ROLES PROVIDES PAR LES ABSTRACT ROLE GROUPS §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§!!
     */
    hasAbstractRole(abstractRole:string) {
        return (this.abstractRoles !== null && this.abstractRoles.length > 0 && this.abstractRoles.indexOf(abstractRole) !== -1);
    }

    static mapUser(rawObject) {


        let roles:Array<string> = [];
        let abstractRoles:Array<string> = [];
        for(let role of rawObject.roles) {
            roles.push(role);
        }

        if(rawObject.abstractRoles){
            for(let abstractRole of rawObject.abstractRoles) {
                abstractRoles.push(abstractRole);
            }
        }

        let user:User =  new User(rawObject.id, rawObject.email, roles, rawObject.firstName, rawObject.lastName, rawObject.matricule);

        if(abstractRoles.length > 0 ){
            user.abstractRoles = abstractRoles;
        }

        if(rawObject.lastLogin){
            user.lastLogin = rawObject.lastLogin
        }

        if(rawObject.thumbnail){
            user.thumbnail = rawObject.thumbnail
        }


        if(rawObject.username){
            user.username = rawObject.username;
        }

        if(rawObject.maxUuidAmount){
            user.maxUuidAmount = rawObject.maxUuidAmount;
        }else
            user.maxUuidAmount = 1;

        return user;
    }

    static mapUsers(rawArray) {
        let result:Array<User> = [];
        for(let o of rawArray) {
            result.push(User.mapUser(o));
        }
        return result;
    }


    static mapLightUsers(raw) {
        let result:Array<User> = [];
        for(let o of raw) {
            result.push(User.mapLightUser(o));
        }
        return result;
    }

    static mapLightUser(raw) {
        return new User(raw.id, null, [], raw.firstName, raw.lastName, "");
    }

    static mapStoredUser(raw) : User {
        let user =  new User(raw.id, raw.email, [], raw.firstName, raw.lastName, raw.matricule);
        user.jwt = raw.jwt;
        user.roles = raw.roles;
        user.abstractRoles = raw.abstractRoles;

        if(raw.thumbnail){
            user.thumbnail = raw.thumbnail
        }

        return user;

    }

    static storePrepare(user:User) : string {
        let result =  {
            id:user.id,
            firstName:user.firstName,
            lastName:user.lastName,
            matricule:user.matricule,
            email:user.email,
            jwt: user.jwt,
            roles:user.roles,
            abstractRoles:user.abstractRoles
        };

        return JSON.stringify(result);
    }

    static mapAbstractRoles(raw:any) : Array<string> {
        let result:Array<string> = [];
        for(let role of raw) {
            result.push(role);
        }
        return result;
    }


    getRoleColor(){
        if (this.isAdmin()){
            return '#E06055';
        }
        if (this.isSuperUser()){
            return '#7986CB';
        }
        else{
            return '#C2C2C2'
        }
    }

    getUserRole(){

        if (this.isAdmin()){
            return 'Administrateur';
        }
        if (this.isSuperUser()){
            return 'Utilisateur portail';
        }
        else{
            return 'Utilisateur mobile'
        }
    }

    preparePost() {

        return {
            "firstName": this.firstName,
            "lastName": this.lastName,
            "username": this.username,
            "matricule": this.matricule,
            "email": this.email,
            "roles": [this.roles],
            "maxUuidAmount" : 1
        };

    }

    preparePut() {

        let defaultEmail:string;
        if(!this.email || (this.email && this.email.length == 0)){
            defaultEmail= 'defaultemail' + this.id + '@hubup.fr';
        }
        else{
            defaultEmail = this.email
        }

        return {
            "firstName": this.firstName,
            "lastName": this.lastName,
            "username": this.username,
            "matricule": this.matricule,
            "email": defaultEmail,
            "roles": this.roles,
            "maxUuidAmount" : this.maxUuidAmount,
        };

    }


}
