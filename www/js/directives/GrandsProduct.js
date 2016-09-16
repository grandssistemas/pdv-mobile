
angular.module('app.core')
  .directive('grandsProduct',function(){
    return {
      templateUrl: 'js/directives/prod.html',
      restrict: 'E',
      scope: {
        product: '=',
        $first: '=first',
        addCart: '&'
      }
    }
  })
