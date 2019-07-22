/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect} from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";

import "assets/css/material-dashboard-react.css?v=1.7.0";
import {ProxyCompany} from "./login/sharedCore/entities/ProxyCompany";

console.log = console.warn = console.error = () => {};

const hist = createBrowserHistory();
global.proxyCompany = new ProxyCompany(null, "hubup-monitor", "HM", "http://52.166.19.40/hubup-monitor/web/app_dev.php", null, "HM");

let nameEQ = "jwt=";
let ca = document.cookie.split(';');
for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
        global.jwt = c.substring(nameEQ.length, c.length);
}



ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/admin" component={Admin}/>
            {/*<Redirect from="/" to="/admin/dashboard" />*/}
            <Redirect from="/" to="/admin/login"/>
        </Switch>
    </Router>,
    document.getElementById("root")
);
