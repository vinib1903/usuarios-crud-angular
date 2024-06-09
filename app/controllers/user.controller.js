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
                console.error('Erro: resposta inválida do servidor.');
            }
        }, function(error) {
            console.error('Erro ao carregar usuários:', error);
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
            $scope.editingUser = false;
            //null
            $scope.successMessage = response.data ? response.data.message : 'Usuário atualizado com sucesso!';
        }, function(error) {
            console.error('Erro ao atualizar usuário:', error);
        });
    };

    $scope.deleteUser = function(id) {
        if (confirm("Tem certeza que deseja apagar este usuário?")) {
            UserService.deleteUser(id).then(function(response) {
                $scope.loadUsers();
            }, function(error) {
                console.error('Erro ao apagar usuário:', error);
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
            $scope.successMessage = response.data ? response.data.message : 'Usuário adicionado com sucesso!';
        }, function(error) {
            console.error('Erro ao adicionar usuário:', error);
        });
    };

    $scope.closeAlert = function() {
        $scope.successMessage = "";
    };

    $scope.loadUsers();
});
