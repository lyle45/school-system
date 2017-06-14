class Toolbar {

    constructor(userService, $state, $rootScope) {
        this._userService = userService;
        this._$state = $state;
        this.user = userService.getUser();
        userService.onUserChange((user) => {
            this.user = user;
        });
        this._$rootScope = $rootScope;
    }

    logout() {
        this._userService.logout();
    }
    toggleAdminView() {
        if (angular.isUndefined(this._$rootScope.adminView)) this._$rootScope.adminView = true;
        else this._$rootScope.adminView = !this._$rootScope.adminView;
        this._$rootScope.$broadcast('clearContainer');
    }
}

myApp.component('toolbar', {
    templateUrl: 'components/school-system/toolbar/toolbar.html',
    controller: Toolbar
});