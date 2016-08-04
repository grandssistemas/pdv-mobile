angular.module('app.core')
.controller('SaleController',function($scope,$http){
  $http.get('/js/mock-venda.json').then(function(data){
    $scope.entity = data.data;
    console.log($scope.entity)
  })
})
