// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

class Neighborhood{
    constructor(name){
      this.id = ++neighborhoodId;
      this.name = name;
      store.neighborhoods.push(this);
    }

    deliveries(){
      return store.deliveries.filter(
        function(deliv){ return deliv.neighborhoodId === this.id}.bind(this)
      )
    }


    customers(){
      return this.deliveries().filter(
        function(deliv) { return deliv.customer() }.bind(this)
      )
    }

    meals(){
      return store.deliveries.map(
        function (item) { return item.meal() }
      ).bind(this)
    }
}


class Meal{
    constructor(title, price){
      this.id = ++mealId;
      this.title = title;
      this.price = price;
      store.meals.push(this);
    }
}


class Customer{
    constructor(name, neighborhoodId){
      this.id = ++customerId;
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      store.customers.push(this);
    }

    deliveries(){
      return store.deliveries.filter(
        function(deliv){ return deliv.customerId === this.id}.bind(this)
      )
    }

    meals(){
      return this.deliveries().filter(
        function(deliv) { return deliv.meal() }.bind(this)
      )
    }

    totalSpent(){
      return self.meals().reduce(function(sum, value) {
        return sum + value.price;
      }, 0);
    }
}



class Delivery{
    constructor(mealId, neighborhoodId, customerId){
      this.id = ++deliveryId;
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      store.deliveries.push(this);
    }


    neighborhood(){
      return store.neighborhoods.find(
        function (item) { return this.neighborhoodId === item.id }.bind(this)
      )
    }

    customer(){
      return store.customers.find(
        function (item) { return this.customerId === item.id }.bind(this)
      )
    }

    meal(){
      return store.meals.find(
        function (item) { return this.mealId === item.id }.bind(this)
      )
    }

}
