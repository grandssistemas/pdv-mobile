var template = '{{product.name}}';

angular.module('app.core')
  .directive('grandsProduct',function(){
    return {
      template: template,
      restrict: 'E',
      scope: {
        product: '='
      },
      link: function (scope, elm, attrs) {

      }
    }
  })
