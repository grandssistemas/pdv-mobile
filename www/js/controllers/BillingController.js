angular.module('app.core')
.controller('BillingController',function($scope,
  entity,
  PaymentTypeService,
  MovementGroupService,
  ShoppingCartService,
  $state,
  localStorageService,
  $cordovaToast,
  $timeout){
  $scope.entity = entity;
  var paymentTypes;
  initializeEntity($scope.entity);

  PaymentTypeService.getByNames(['Real','Cartão de Crédito','Cartão de Débito'])
    .then(function(data){
      paymentTypes = data.data.values;
    })

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

  $scope.update = update;

  function update(entity){
    entity = angular.copy(entity);
    entity.isBilled = {value: true};
    entity.status = 'FINISH';
    entity.entries = [{
      value: entity.total,
      paymentType: getPaymentType($scope.paymentType)
    }]
    entity.subTotal === 0 ? angular.noop : entity.subTotal *= -1;
    entity.total === 0 ? angular.noop : entity.total *= -1;
    entity.discount === 0 ? angular.noop : entity.discount *= -1;
    entity.change = entity.change.toFixed(2) * -1;
    entity.executionDate = new Date();

    entity.movements = entity.movements.map(function (data) {
        data.item.unitValues = [];
        return data;
    });
    entity.cashAccountMovements = [];
    var pagtype = getTipoDePagamento($scope.paymentType);
    if(pagtype){
      var valor = (entity.total*-100).toFixed(0);
      ConectaRedeCard.lancaPagamento(valor,localStorageService.get('token'),1,function(resp){
        doMovement(entity);
      },credError)
    }else{
      doMovement(entity);
    }
  }

  function getTipoDePagamento(paymentType){
    switch (paymentType) {
      case 'Cartão de Crédito':
      return 'CREDITO_A_VISTA';
    case 'Cartão de Débito':
      return 'DEBITO';
      default:
        return null;
    }
  }

  function credError(err){
      $cordovaToast.showShortTop('Erro na tentativa de pagamento.');
  }

  function doMovement(entity){
    MovementGroupService.billing(entity).then(function(data){
      ShoppingCartService.setShoppingCart([]);
      $state.go('menu.searchprod');
    })
  }

  function getPaymentType(paymentType){
    console.log(paymentType)
    return paymentTypes.reduce(function(a,b){
      if(b.name.indexOf(paymentType)){
        return b;
      }
      return a;
    },null);
  }

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
