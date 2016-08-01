
angular.module('app.core', ['ionic','LocalStorageModule'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider,$urlRouterProvider,localStorageServiceProvider) {

  $stateProvider.state('sale', {
    url: '/sale',
    templateUrl: '../templates/sale.html',
    controller: 'SaleController'
  });
  $stateProvider.state('searchprod', {
    url: '/searchprod',
    templateUrl: 'templates/searchprod.html',
    controller: 'SearchProdController'
  });

  $stateProvider.state('billing', {
    url: '/billing',
    templateUrl: 'templates/billing.html',
    controller: 'BillingController'
  });

  $urlRouterProvider.otherwise('/searchprod');

  localStorageServiceProvider
    .setPrefix('fashionmanager-pdv');
})
