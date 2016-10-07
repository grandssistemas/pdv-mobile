angular.module('app.core')
.controller('LoginController',function($scope,
  $state,
  LoginService,
  $cordovaToast){
  LoginService.removeToken();

  $scope.entity = {};
  $scope.entity = LoginService.getSavedUser($scope.entity);

  $scope.doLogin = function(entity){
    LoginService.setToken(entity.email,entity.password, entity.saveData).then(function(data){
      $state.go('menu.searchprod');
    },function(data){
      $cordovaToast.showShortTop('Login ou senha incorreto.');
    })
  }
})
