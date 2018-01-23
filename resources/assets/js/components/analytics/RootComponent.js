/**
 * Created by Rajesh on 1/23/18.
 */

import React, { Component } from 'react';
import axios from "axios";
import {MD5} from '../../libs/md5';


export default class RootComponent extends Component {

    componentDidMount(){
        let thisUser = localStorage.getItem('userID');

        if(!thisUser){
            RootComponent.getUserData().then(user => {
                if(user.id){
                    localStorage.setItem('userID', user.id);
                    localStorage.setItem('clientIP', user.ip);
                    //API request to save user data
                    this.setSessions(user.id);
                }
            })
        }else{
            this.setSessions(thisUser);
        }
    }

    setSessions(userID){
        let thisSession = sessionStorage.getItem('sessionID');

        if(!thisSession){
            let sessionID = userID + new Date().getTime();
            sessionStorage.setItem('sessionID', sessionID);
            console.log("From Session:" +  sessionID);
        }else{
            console.log(thisSession);
        }

    }
}

RootComponent.getUserData = function () {

    return axios.get('/api/client-ip')
        .then((response) =>{

            let userID = MD5(response.data.ip + "_" + response.data.iso_code + "_" + RootComponent.browser() + "_" + RootComponent.detectMob());

            return {
                id:   userID,
                isMobile: RootComponent.detectMob(),
                browser: RootComponent.browser(),
                platform: navigator.platform,
                ip: response.data.ip,
                iso_code: response.data.iso_code,
                country: response.data.country,
                city: response.data.city
            };
        })
};

RootComponent.detectMob = function () {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
};

RootComponent.browser = function() {
    // Return cached result if avalible, else get result then cache it.
    if (RootComponent.browser.prototype._cachedResult)
        return RootComponent.browser.prototype._cachedResult;

    // Opera 8.0+
    let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    let isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    let isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    let isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    let isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    let isBlink = (isChrome || isOpera) && !!window.CSS;

    return RootComponent.browser.prototype._cachedResult =
        isOpera ? 'Opera' :
            isFirefox ? 'Firefox' :
                isSafari ? 'Safari' :
                    isChrome ? 'Chrome' :
                        isIE ? 'IE' :
                            isEdge ? 'Edge' :
                                isBlink ? 'Blink' :
                                    "Don't know";
};
