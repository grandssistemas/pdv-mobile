angular.module('app.core')
.controller('BillingController',function($scope,
  entity,
  $timeout){
  $scope.entity = entity;
  initializeEntity($scope.entity);

  $scope.$watch('entity.discount',function(data,old){
    if(data != null){
      if(data <= $scope.entity.subTotal){
        attTotal($scope.entity);
      }else{
        $scope.entity.discount = old;
      }
    }
  })

  $scope.$watch('entity.entries[0].value',function(data){
    if(data != null){
      if(data > entity.total){
        $scope.entity.change = Math.abs(data-$scope.entity.total);
      }else{
        $scope.entity.change = 0;
      }
    }
  })

  function initializeEntity(entity){
      entity.change = entity.change || 0;
      $scope.discount = entity.discount *= -1;
      entity.total *= -1;
      entity.subTotal *= -1;
  }

  function attTotal(entity){
    entity.total = entity.subTotal - entity.discount;
  }
})
