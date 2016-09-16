angular.module('app.core')
.service('ShoppingCartService', function(){
  var shoppingCart = [];

  this.addItem = addItem;
  this.setShoppingCart = setShoppingCart;
  this.get = get;

  function addItem(item){
    var cartItemIndex = findIndex(item);
    if(cartItemIndex > -1){
      shoppingCart[cartItemIndex].count += item.count;
    }else{
      shoppingCart.push(item);
    }
  };

  function findIndex(item){
    return shoppingCart.reduce(function(a,b,index){
      if(b.item.id === item.item.id){
        return index;
      }
      return a;
    }, -1);
  }

  function get(){
    return shoppingCart;
  }

  function setShoppingCart(newShoppingCart){
    shoppingCart = newShoppingCart;
  };

})
