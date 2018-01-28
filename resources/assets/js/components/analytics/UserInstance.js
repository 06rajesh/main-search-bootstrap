/**
 * Created by Rajesh on 1/24/18.
 */


class UserInfo{

    constructor(){
        this.userID = null;
        this.sessoinID = null;
        this.hasSession = false;
    }

    setSession(session){
        this.sessoinID = session;
        sessionStorage.setItem('sessionID', session);
        this.hasSession = true;
    }

    getSessoin(){
        return this.sessoinID;
    }

    setUser(userID){
        this.userID = userID;
        localStorage.setItem('userID', userID);
    }

    getUser() {
        return this.userID;
    }
}

export default new UserInfo();
