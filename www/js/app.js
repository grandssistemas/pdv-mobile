
angular.module('app.core', ['ionic','LocalStorageModule','ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider,$urlRouterProvider,localStorageServiceProvider,$httpProvider,$ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('').previousTitleText(false);
  $stateProvider.state('sale', {
    url: '/sale',
    templateUrl: 'templates/sale.html',
    controller: 'SaleController'
  });
  $stateProvider.state('searchprod', {
    url: '/searchprod',
    templateUrl: 'templates/searchprod.html',
    controller: 'SearchProdController',
    params: {
      value: null,
      level: null
    }
  });

  $stateProvider.state('billing', {
    url: '/billing',
    templateUrl: 'templates/billing.html',
    controller: 'BillingController'
  });

  $urlRouterProvider.otherwise('/searchprod');

  localStorageServiceProvider
    .setPrefix('fashionmanager-pdv');
    var countLoader = 0, countSuccessMessage = 0;
    $httpProvider.interceptors.push(function () {
        return {
            'request': function (config) {
                config.headers['gumgaToken'] = 'PDVMOBILE';
                return config;
            }
        };
    })
}).value('route','http://192.168.25.179:8084/fashionmanager-api/api')
