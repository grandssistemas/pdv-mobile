angular.module('app.core')
.service('BaseService', function($http){
  this.get = function(url,params){
    return $http.get(url,params);
  }
  this.post = function(url,params){
    return $http.get(url,params);
  }
  this.put = function(url,params){
    return $http.get(url,params);
  }
  this.delete = function(url,params){
    return $http.get(url,params);
  }
})
