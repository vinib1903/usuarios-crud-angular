angular.module('userApp').controller('LoginController', function($scope, $http, $location) {
    $scope.loginData = {};
    $scope.errorMessage = '';

    $scope.login = function() {
        $http.post('https://equipamentos-service.azurewebsites.net/api/auth/login', $scope.loginData).then(function(response) {
            sessionStorage.setItem('authToken', response.data.Token);
            $location.path('/users');
        }, function(error) {
            $scope.errorMessage = error.data.Message || "O login falhou, verifique suas credenciais.";
        });
    };
});
