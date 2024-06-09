angular.module('userApp').config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'app/views/login.html',
            controller: 'LoginController'
        })
        .when('/users', {
            templateUrl: 'app/views/user-list.html',
            controller: 'UserController',
            resolve: {
                auth: function($q, $location) {
                    var deferred = $q.defer();
                    if (sessionStorage.getItem('authToken')) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.path('/login');
                    }
                    return deferred.promise;
                }
            }
        })
        .otherwise({
            redirectTo: '/login'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
