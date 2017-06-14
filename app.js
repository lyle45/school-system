let myApp = angular.module('myApp', ['ui.router', 'ngResource', 'ngMaterial', 'xeditable', 'checklist-model']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            template: '<school-system></school-system>',
            access: {restricted: true}
        })
        .state('login', {
            url: '/login',
            template: '<login></login>'
        });
    $urlRouterProvider.otherwise('/');
});

myApp.run(function ($rootScope, $state, userService) {
    $rootScope.$on('$stateChangeStart',
        function (event, next, current) {
            if (next.access && next.access.restricted) {
                userService.getUserStatus()
                    .then((result) => {
                        if (result) {
                            let x = 1;
                            $state.go(next, {}, {notify: false}).then(() => {
                                $rootScope.$broadcast('$stateChangeSuccess', next, {}, current, {})
                            });
                        } else {
                            $state.go('login', {}, {notify: false}).then(() => {
                                $rootScope.$broadcast('$stateChangeSuccess', 'login', {}, current, {});
                            })
                        }
                    });
                event.preventDefault()
            }
            if (next.name === 'login') {
                userService.getUserStatus()
                    .then((result) => {
                        if (result) {
                            $state.go('main', {}, {notify: false}).then(() => {
                                $rootScope.$broadcast('$stateChangeSuccess', 'main', {}, current, {});
                            })
                        } else {
                            $state.go(next, {}, {notify: false}).then(() => {
                                $rootScope.$broadcast('$stateChangeSuccess', next, {}, current, {});
                            })
                        }
                    });
                event.preventDefault()
            }
        });
});
myApp.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});