
angular.module('app.core')
  .directive('grandsCountButtons',function(){
    return {
      templateUrl: '/js/directives/countButton.html',
      restrict: 'E',
      scope: {
        count: '=',
        afterClick: '&?'
      },
      link: function(scope){
        scope.count = scope.count || 0;

        scope.add = function(){
          scope.count++;
          scope.afterClick();
        }

        scope.sub = function(){
          if(scope.count > 0){
            scope.count--;
            scope.afterClick();
          }
        }
      }
    }
  })
