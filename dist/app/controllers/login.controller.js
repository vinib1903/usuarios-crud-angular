angular.module('userApp').controller('LoginController', function($scope, $http, $location) {
    $scope.loginData = {};
    $scope.errorMessage = '';

    $scope.login = function() {
        $http.post('https://equipamentos-service.azurewebsites.net/api/auth/login', $scope.loginData)
            .then(function(response) {
                if (response && response.data && response.data.Token) {
                    sessionStorage.setItem('authToken', response.data.Token);
                    $location.path('/users');
                } else {
                    $scope.errorMessage = 'Login failed: Invalid response from server';
                    console.error('Invalid response:', response);
                }
            }, function(error) {
                if (error && error.data && error.data.Message) {
                    $scope.errorMessage = error.data.Message;
                } else {
                    $scope.errorMessage = "Login failed: No response from server or unknown error";
                }
                console.error('Error during login request:', error);
            });
    };
});
