import React from 'react';
import './AuthenticationControl.css';

//Material modules
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//Icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import hubup_logo_v2 from './../../assets/img/logo_hubup_squared_v2.svg';
import {Texts} from "./AuthenticationControl.texts"
import {LoginAPI} from "./API/LoginAPI";


export class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayLoginPopup:true,

            proxyCompany:{a:1},
            proxyCompanyTag:"",
            authenticatingProxyCompany:false,
            showCompanyTagError:false,

            user:null,
            username:"",
            password:"",
            authenticatingUser:false,
            showCredentialsError:false,

            incrementor:0
        }
    }

    render() {

        if(this.state.displayLoginPopup === false){
            return null;
        }

        return(
            <div style={{position:'fixed', left:0, top:0, height:'100vh', width:'100vw',  zIndex:8000}} className={"blurred-bg"}>

                <div style={{height:'100%', width:'100%'}} className={"overflow-wrapper"}>

                    <div className={"flex-overflow-special"} style={{flexDirection:'column', display:'flex', justifyContent:'center', alignItems:'center'}}>

                        {
                            this.state.proxyCompany ?

                                <div className={"card-login"}>

                                    <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginBottom:10}}>
                                        <img src={hubup_logo_v2} alt="image_line" style={{height:65, width:65}}/>

                                        <span className={"login-title"}>
                                        {Texts.getText('login_title')}
                                    </span>
                                    </div>


                                    <TextField
                                        label={Texts.getText('username_field_label')}
                                        style={{width: '100%', minHeight:48}}
                                        helperText={this.state.showCredentialsError ? Texts.getText('username_field_helper_text') : null}
                                        className={"text-field"}
                                        value={this.state.username}
                                        onChange={(event) => {
                                            this.handleChangeUsername(event)
                                        }}
                                        margin="normal"
                                        disabled={this.state.authenticatingUser}
                                        required={true}
                                        error={this.state.showCredentialsError}
                                        variant={"outlined"}
                                    />

                                    <TextField
                                        label={Texts.getText('password_field_label')}
                                        style={{width: '100%', minHeight:48}}
                                        helperText={this.state.showCredentialsError ? Texts.getText('password_field_helper_text') : null}
                                        className={"text-field"}
                                        type="password"
                                        value={this.state.password}
                                        onChange={(event) => {
                                            this.handleChangePassword(event)
                                        }}
                                        margin="normal"
                                        disabled={this.state.authenticatingUser}
                                        required={true}
                                        error={this.state.showCredentialsError}
                                        variant={"outlined"}
                                    />

                                    <div style={{height:80, paddingTop:20, display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        {
                                            this.state.authenticatingUser ?
                                                <CircularProgress style={{color: '#3f98f4'}}/>
                                                :
                                                <Button variant={"contained"}
                                                        style={{backgroundColor: '#3f98f4'}}
                                                        onClick={() => {
                                                            this.authenticateUser()
                                                        }} disabled={this.state.username.length < 1 || this.state.password.length < 1}>
                                                    <span style={{
                                                        color: '#FFFFFF',
                                                        marginTop: 2,
                                                        marginRight: 4
                                                    }}>{Texts.getText('login_button_text')}</span>
                                                    <ArrowForwardIcon style={{color: '#FFFFFF', fontSize: 18}}/>
                                                </Button>
                                        }
                                    </div>
                                </div>
                                :
                                <div className={"card-login"}>

                                    <div style={{width:'auto', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                                        <img src={hubup_logo_v2} alt="image_line" style={{height:65, width:65}}/>

                                        <span className={"login-title"}>
                                        {Texts.getText('company_login_title')}
                                    </span>
                                    </div>

                                    <span style={{color:'#555555', textAlign:'center', fontSize:14, maxWidth:300, marginTop:50, marginBottom:20 }}>
                                    {Texts.getText('company_login_subtitle')}
                                </span>

                                    <TextField
                                        label={Texts.getText('company_login_field_label')}
                                        style={{width:'100%', minHeight:48}}
                                        helperText={this.state.showCompanyTagError ? Texts.getText('company_login_field_helper_text') : ""}
                                        className={"text-field"}
                                        value={this.state.proxyCompanyTag}
                                        margin="normal"
                                        disabled={this.state.authenticatingProxyCompany}
                                        required={true}
                                        error={this.state.showCompanyTagError}
                                        variant={"outlined"}
                                    />

                                    <div style={{height:80, paddingTop:20, display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        {
                                            this.state.authenticatingProxyCompany ?
                                                <CircularProgress style={{color:'#3f98f4'}} />
                                                :
                                                <Button variant={"contained"} style={{backgroundColor:'#3f98f4'}}
                                                        onClick={()=>{this.authenticateProxyCompany()}} disabled={this.state.proxyCompanyTag.length < 1}>
                                                    <span style={{color:'#FFFFFF', marginTop:2,marginRight:4}}>{Texts.getText('company_login_button_text')}</span>
                                                    <ArrowForwardIcon style={{color:'#FFFFFF', fontSize:18}} />
                                                </Button>
                                        }
                                    </div>
                                </div>
                          }
                    </div>
                </div>
            </div>
        )
    }


    handleChangeUsername(event) {
        this.setState({
            username: event.target.value,
            showCredentialsError: false
        })
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value,
            showCredentialsError: false
        })
    }

    authenticateUser() {
        this.setState({
            authenticatingUser:true,
            showCredentialsError:false
        });
        LoginAPI.login(this.state.username, this.state.password)
            .then((response)=>{
                this.props.history.push('/admin/dashboard');
                this.setState({
                    displayLoginPopup:false
                })
            })
            .catch((error)=>{
                console.log(error);
                this.setState({
                    authenticatingUser:false,
                    showCredentialsError:true
                });
            })
    }
}