
angular.module('app.core')
  .directive('grandsCountButtons',function(){
    return {
      templateUrl: '/js/directives/countButton.html',
      restrict: 'E',
      scope: {
        product: '=',
        $first: '=first'
      }
    }
  })
