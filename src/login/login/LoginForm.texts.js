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
                fr:"Connexion aux serveur proxy",
                en:"Proxy server login",
            },
            username_field_label:{
                fr:"nom d'utilisateur",
                en:"user name",
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
        }
    }
}