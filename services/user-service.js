class UserService {
//
    constructor($q, apiService) {
        this._apiService = apiService;
        this._$q = $q;
        this.onUserChangeListenersFn = [];

        apiService.get('session').then((data) => {
            if (data) {
                this.setUser(data.user);
            }
        })
    }

    login(username, password) {
        let deferred = this._$q.defer();
        this._apiService.post('login',
            {user: {username: username, password: password}})
        // handle success
            .then((data) => {
                if (data.status === 'success') {
                    this.setUser(data);
                    deferred.resolve();
                } else {
                    this.clearUser();
                    deferred.reject();
                }
            }, () => {
                this.clearUser();
                deferred.reject();
            });
        return deferred.promise;
    }

    logout() {
        let deferred = this._$q.defer();
        this._apiService.get('logout')
            .then((data) => {
                if (data) {
                    window.location.reload();
                } else {
                    deferred.reject();
                }
            }, (err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    setUser(user) {
        this._user = user;
        this._notifyUserListeners();
    }

    clearUser() {
        this._user = undefined;
    }

    getUserStatus() {
        return this._apiService.get('getUserStatus');
    }

    getUser() {
        return this._user
    }

    onUserChange(fn) {
        this.onUserChangeListenersFn.push(fn);
    }

    _notifyUserListeners() {
        _.forEach(this.onUserChangeListenersFn, (cb) => {
            cb(this._user)
        })
    }

}
myApp.service('userService', UserService);