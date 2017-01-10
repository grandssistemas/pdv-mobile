
angular.module('app.core', ['ionic',
'LocalStorageModule',
'ngCordova',
'ui.utils.masks'])
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
.config(function($stateProvider,
  $urlRouterProvider,
  localStorageServiceProvider,
  $httpProvider,
  $ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('').previousTitleText(false);
  $stateProvider.state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })
  $stateProvider.state('menu.sale', {
    url: '/sale',
    templateUrl: 'templates/sale.html',
    controller: 'SaleController'
  });
  $stateProvider.state('menu.searchprod', {
    url: '/searchprod',
    templateUrl: 'templates/searchprod.html',
    controller: 'SearchProdController',
    params: {
      value: null,
      level: null
    }
  });
  $stateProvider.state('menu.resultsale', {
    url: '/sale/:id',
    templateUrl: 'templates/resultsale.html',
    controller: 'ResultSaleController',
    resolve: {
        entity: ['$stateParams', '$http','route', function ($stateParams, $http,route) {
            var url = route.concat('/api/movementgroup/').concat($stateParams.id);
            return $http.get(url).then(function(data){
              return data.data;
            });
        }]
    }
  });
  $stateProvider.state('menu.billing', {
    url: '/billing/:id',
    templateUrl: 'templates/billing.html',
    controller: 'BillingController',
    resolve: {
        entity: ['$stateParams', '$http','route', function ($stateParams, $http,route) {
            var url = route.concat('/api/movementgroup/').concat($stateParams.id);
            return $http.get(url).then(function(data){
              return data.data;
            });
        }]
    }
  });
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  });

  $urlRouterProvider.otherwise('/login');

  localStorageServiceProvider.setPrefix('fashionmanager-pdv');


  var countLoader = 0,
  countSuccessMessage = 0
  $httpProvider.interceptors.push(function ($injector,localStorageService) {
      return {
          'request': function (config) {
              config.headers['gumgaToken'] = localStorageService.get('token');
              return config;
          },
          'responseError': function (rejection) {
            if (rejection.status === 403) {
                var state = $injector.get('$state');
                state.go('login');
            }
          }
      };
  })
}).value('route','http://177.72.161.165:8084/fashionmanager-api')
