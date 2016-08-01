angular.module('app.core')
.controller('SearchProdController',function($scope){
  $scope.search = function(event){
    console.log(event);
  }
})
