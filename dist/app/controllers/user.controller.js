angular.module('userApp').controller('UserController', function($scope, UserService) {
    $scope.users = [];
    $scope.editingUser = null;
    $scope.addingUser = false;
    $scope.newUser = {};
    $scope.successMessage = "";

    $scope.loadUsers = function() {
        UserService.getUsers().then(function(response) {
            if (response && response.data) {
                $scope.users = response.data;
            } else {
                console.error('Error: Invalid response from server');
            }
        }, function(error) {
            console.error('Error loading users:', error);
        });
    };

    $scope.editUser = function(user) {
        $scope.editingUser = angular.copy(user);
    };

    $scope.cancelEdit = function() {
        $scope.editingUser = null;
    };

    $scope.updateUser = function() {
        UserService.updateUser($scope.editingUser).then(function(response) {
            $scope.loadUsers();
            $scope.editingUser = null;
            $scope.successMessage = response.data ? response.data.message : 'User updated successfully';
        }, function(error) {
            console.error('Error updating user:', error);
        });
    };

    $scope.deleteUser = function(id) {
        if (confirm("Are you sure you want to delete this user?")) {
            UserService.deleteUser(id).then(function(response) {
                $scope.loadUsers();
            }, function(error) {
                console.error('Error deleting user:', error);
            });
        }
    };

    $scope.showAddUserForm = function() {
        $scope.addingUser = true;
        $scope.newUser = {};
    };

    $scope.cancelAdd = function() {
        $scope.addingUser = false;
    };

    $scope.addUser = function() {
        UserService.createUser($scope.newUser).then(function(response) {
            $scope.loadUsers();
            $scope.addingUser = false;
            $scope.successMessage = response.data ? response.data.message : 'User added successfully';
        }, function(error) {
            console.error('Error adding user:', error);
        });
    };

    $scope.closeAlert = function() {
        $scope.successMessage = "";
    };

    $scope.loadUsers();
});
