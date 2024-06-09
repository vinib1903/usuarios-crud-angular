angular.module('userApp').service('UserService', function($http) {
    var baseUrl = 'https://equipamentos-service.azurewebsites.net/usuario';

    function getAuthToken() {
        return sessionStorage.getItem('authToken');
    }

    this.getUsers = function() {
        return $http.get(baseUrl, {
            headers: { 'Authorization': 'Bearer ' + getAuthToken() }
        });
    };

    this.getUserById = function(id) {
        return $http.get(baseUrl + '/' + id, {
            headers: { 'Authorization': 'Bearer ' + getAuthToken() }
        });
    };

    this.createUser = function(user) {
        return $http.post(baseUrl, user, {
            headers: { 'Authorization': 'Bearer ' + getAuthToken() }
        });
    };

    this.updateUser = function(user) {
        return $http.put(baseUrl + '/' + user.id, user, {
            headers: { 'Authorization': 'Bearer ' + getAuthToken() }
        });
    };

    this.deleteUser = function(id) {
        return $http.delete(baseUrl + '/' + id, {
            headers: { 'Authorization': 'Bearer ' + getAuthToken() }
        });
    };
});
