angular.module('app.core')
.service('LoginService', function(BaseService,route){


  this.setToken = setToken;

  function setToken(email,password) {
    var promiseObj = {},
      param = {user: email ,password: password};
      return BaseService.post(route.concat('/public/token'),param).then(function (data) {
        console.log(data)
        if (data.data.token) {
          // GumgaWebStorage.setSessionStorageItem('user',$rootScope.loggedUser);
          // GumgaWebStorage.setSessionStorageItem('token',data.data.token);
        }
        return data.data;
      });
  };
})
