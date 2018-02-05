/**
 * Created by Rajesh on 1/24/18.
 */

import UserInstance from '../components/analytics/UserInstance';
import axios from 'axios';

export function sendUserSearch(searchData) {
    if(UserInstance.hasSession){
        searchData.user = UserInstance.getUser();
        searchData.session = UserInstance.getSessoin();

        sendToApi('/api/send-search', searchData).then((response) => {
            if(response.data.success){
                //console.log(response.data);
            }
        });
    }
}

export function sendUserActivity(userActivity) {
    if(UserInstance.hasSession) {
        userActivity.user = UserInstance.getUser();
        userActivity.session = UserInstance.getSessoin();

        sendToApi('/api/send-activity', userActivity).then((response) => {
            if(response.data.success){
                //console.log(response.data);
            }
        });

    }
}

export function startNewSession() {
    let sessionValue = {
        user : UserInstance.getUser()
    };

    sendToApi('/api/create-session', sessionValue).then((response) => {
        if(response.data.success){
            UserInstance.setSession(response.data.id);
            //console.log(response.data.id);
        }
    });
}

export function stopCurrentSession() {
    let userActivity = {};

    if(UserInstance.hasSession) {
        userActivity.user = UserInstance.getUser();
        userActivity.session = UserInstance.getSessoin();

        console.log("Session Will Stop");

        sendToApi('/api/stop-session', userActivity).then((response) => {
            if(response.data.success){
                //console.log(response.data);
            }
        });

    }
}

export function addNewUser(userInfo) {
    sendToApi('/api/create-user', userInfo).then((response) => {
        if(response.data.success){
            //console.log(response.data);
        }
    });
}

export function sendUserFeedback(userFeedback) {
    userFeedback.session = UserInstance.getSessoin();
    userFeedback.domain = 'www.pipilika.com';
    return sendToApi('/api/send-feedback', userFeedback).then((response) => {
        if(response.data.success){
            return response.data;
        }
    });
}

export function sendUserContact(userContact) {
    userContact.session = UserInstance.getSessoin();
    userContact.domain = 'www.pipilika.com';
    return sendToApi('/api/send-contact', userContact).then((response) => {
        if(response.data.success){
            return response.data;
        }
    });
}

function sendToApi(url, params) {
    return axios({
        method : 'post',
        url    : url,
        headers: {'api-key': 'W2AFAE3H'},
        params: params
    }).then((response) => {
        return response;
    }).catch((err) => {
        console.log(err);
    });
}
