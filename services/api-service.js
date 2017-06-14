class ApiService {
    constructor($http) { // This service connects to our REST API
        this._$http = $http;
        this._serviceBase = 'api/';
    }

        get(q) {
            return this._$http.get(this._serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        post(q, object) {
            return this._$http.post(this._serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        put(q, object) {
            return this._$http.put(this._serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        delete(q) {
            return this._$http.delete(this._serviceBase + q).then(function (results) {
                return results.data;
            });
        };
    }

myApp.service('apiService', ApiService);

