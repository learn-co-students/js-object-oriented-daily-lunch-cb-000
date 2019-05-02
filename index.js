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
      return this.deliveries().map(function(d) { return d.customer() }.bind(this)).filter( onlyUnique );
    }


    meals(){
      return this.deliveries().map(function(d) { return d.meal() }.bind(this)).filter( onlyUnique );
    }

}


class Meal{
    constructor(title, price){
      this.id = ++mealId;
      this.title = title;
      this.price = price;
      store.meals.push(this);
    }

    deliveries(){
      return store.deliveries.filter(
        function(deliv){ return deliv.mealId === this.id}.bind(this)
      )
    }

    customers(){
      return this.deliveries().map(function(d) { return d.customer() }.bind(this))
    }

    static byPrice(){
      return store.meals.sort(function(a, b){return b.price - a.price});
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
      return this.deliveries().map(function(d) { return d.meal() }.bind(this))
    }

    totalSpent(){
      return this.meals().reduce(function(sum, value) {
        return sum + value.price;
      }.bind(self), 0);
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
