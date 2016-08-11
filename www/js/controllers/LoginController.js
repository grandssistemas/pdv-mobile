angular.module('app.core')
.controller('LoginController',function($scope,$state,LoginService){
  $scope.doLogin = function(entity){
    LoginService.setToken(entity.email,entity.password).then(function(data){
      console.log(data);
      $state.go('menu.searchprod');
    })
  }
})
