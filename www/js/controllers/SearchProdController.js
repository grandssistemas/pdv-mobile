angular.module('app.core')
.controller('SearchProdController',function($scope,CategoryService){
  $scope.place = null;
  $scope.categoryClass = {
    'button-outline': $scope.place != 'CATEGORY'
  };
  $scope.productClass = {
    'button-outline': $scope.place != 'PRODUCTTYPE'
  };

  getBase();

  $scope.getChildren = getChildren;

  $scope.getFather = function(value){
    $scope.place = null;
    if(value.categoryType === 'DEPARTMENT'){
      getBase();
    }else{
      CategoryService.getFatherLevel(value).then(function(data){
        $scope.values = [data.data.data];
      })
    }
  }

  $scope.search = function(event){
    console.log(event);
  }

  function getBase(){
    $scope.place = null;
    CategoryService.getTree().then(function(response){
        $scope.values = [{
          name: 'Departamentos',
          childrens: response.data.data}];
    })
  }

  function getChildren(item){
    $scope.place = null;
    CategoryService.getChildren(item).then(function(response){
      item.childrens = response.data.data;
      $scope.values = [item];
    })
  }

  $scope.getLevel = function(level){
    $scope.place = level;
    CategoryService.getLevel(level).then(function(response){
      $scope.values = response.data.data;
    });
  }
})
