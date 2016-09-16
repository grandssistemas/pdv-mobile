angular.module('app.core')
.service('LoginService', function(BaseService,route,localStorageService){


  this.setToken = setToken;
  this.removeToken = removeToken;

  function setToken(email,password) {
    var promiseObj = {},
      param = {user: email ,password: password};
      return BaseService.post(route.concat('/public/token'),param).then(function (data) {
        if (data.data.token) {
          localStorageService.set('token',data.data.token);
        }
        return data.data;
      },function(data){
        console.log(data)
      });
  };

  function removeToken(){
    localStorageService.remove('token');
  }
})
