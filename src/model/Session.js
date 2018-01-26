export default class Session {
    
    static myInstance = null;
    _sessionName = "";
    _sessionValue = "";
    _cookie = "";

    static getInstance() {
        if (this.myInstance == null) {
            this.myInstance = new Session(new SingletonClass());
        }

        return this.myInstance;
    }

    setCookie(cookie) {
        this._cookie = cookie;
    }

    setSessionValue(value) {
        this._sessionValue = value;
    }

    setSessionName(name) {
        this._sessionName = name;
    }

    getSessionCookie() {
        return this._cookie;
    }

    getSessionID() {
        return this._sessionValue;
    }
}

class SingletonClass {

}