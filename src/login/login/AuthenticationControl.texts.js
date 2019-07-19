export class Texts {

    static getText(key) {
        let obj = Texts.loadTexts()[key], text, language = global.language ? global.language : 'fr';
        if (obj) {
            text = obj[language]
        }
        return text ? text : '-----'
    }

    static loadTexts() {
        return {
            login_title:{
                fr:"Système de surveillance",
                en:"Monitoring login",
            },
            username_field_label:{
                fr:"Identifiant ou adresse e-mail",
                en:"Username or e-mail address",
            },
            username_field_helper_text:{
                fr:"Identifiants invalides",
                en:"Invalid credentials",
            },
            password_field_label:{
                fr:"Mot de passe",
                en:"Password",
            },
            password_field_helper_text:{
                fr:"Identifiants invalides",
                en:"Invalid credentials",
            },
            login_button_text:{
                fr:"CONNEXION",
                en:"LOG IN",
            },
            company_login_title:{
                fr:"Connexion",
                en:"Applications login",
            },
            company_login_subtitle:{
                fr:"Entrez votre identifiant d'entreprise pour accéder à l'application",
                en:"Type in your company ID to access the applications",
            },
            company_login_field_label:{
                fr:"Identifiant d'entreprise",
                en:"Company ID",
            },
            company_login_field_helper_text:{
                fr:"Identifiant invalide",
                en:"Invalid credential",
            },
            company_login_button_text:{
                fr:"SUIVANT",
                en:"NEXT",
            },
            pre_company_label:{
                fr:"Entreprise: ",
                en:"Company: ",
            },
            change_company_button_text:{
                fr:"CHANGER",
                en:"CHANGE",
            },
        }
    }
}