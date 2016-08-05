angular.module('app.core')
.controller('SearchProdController',function($scope,ShoppingCartService,$ionicPopover,CategoryService,StockItemService,$cordovaKeyboard){
  $scope.place = null;

  $ionicPopover.fromTemplateUrl('add-cart.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  getBase();

  $scope.getChildren = getChildren;

  $scope.addCart = function(item,$event){
    console.log(item)
    var cost = item.item.productInternalBarCodes[0].costValue;
    var value = item.item.productInternalBarCodes[0].saleValue;
    ShoppingCartService.addItem({item:item,count:1,costValue:cost,saleValue:value,soldValue:value});
    $scope.popover.show($event);
  }

  $scope.getFather = function(value){
    $scope.products = null;
    $scope.place = null;
    if(value.categoryType === 'DEPARTMENT'){
      getBase();
    }else{
      CategoryService.getFatherLevel(value).then(function(data){
        $scope.values = [data.data.data];
      })
    }
  };

  $scope.getLevel = function(level){
    $scope.products = null;
    $scope.place = level;
    CategoryService.getLevel(level).then(function(response){
      $scope.values = response.data.data;
    });
  };

  $scope.search = function(event,value){
    $scope.place = null;
    if(event.keyCode === 13) {
      StockItemService.getByName(value).then(setStockItens);
      $cordovaKeyboard.close()
      event.preventDefault();
    }
  };

  function setStockItens(response){
    $scope.products = response.data.values.reduce(function(a,b,index){
      if(index%2 == 0){
        a.push([b]);
      }else{
        a[a.length-1].push(b);
      }
      return a;
    },[]);
  }

  function getBase(){
    $scope.products = null;
    $scope.place = null;
    CategoryService.getTree().then(function(response){
      $scope.values = [{
        name: 'Departamentos',
        childrens: response.data.data}];
    })
  }

  function getChildren(item){
    $scope.place = null;
    if(item.categoryType !== 'PRODUCTTYPE'){
      CategoryService.getChildren(item).then(function(response){
        item.childrens = response.data.data;
        $scope.values = [item];
      });
    }else{
      StockItemService.getByProductType(item.id).then(setStockItens);
    }
  }
})
