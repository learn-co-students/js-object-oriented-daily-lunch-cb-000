// global datastore
let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};

// Neighborhoods
let neighborhoodId = 0;
class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.neighborhoodId === this.id;
    }.bind(this));
  }
  customers() {
    const customers = this.deliveries().map(function(delivery) {
      return delivery.customer();
    }.bind(this));
    return customers.filter(function(customer, index){
      return customers.indexOf(customer) >= index;
    });
  }
  meals() {
    const meals = this.deliveries().map(function(delivery) {
      return delivery.meal();
    }.bind(this));
    return meals.filter(function(meal, index) {
      return meals.indexOf(meal) >= index;
    });
  }
}

// Customers
let customerId = 0;
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.customerId === this.id;
    }.bind(this));
  }
  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal();
    }.bind(this));
  }
  totalSpent() {
    return this.meals().reduce(function(totalCost, meal) {
      return totalCost + meal.price;
    }, 0);
  }
}

// Meals
let mealId = 0;
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.mealId === this.id;
    }.bind(this));
  }
  customers() {
    const customers = this.deliveries().map(function(delivery) {
      return delivery.customer();
    }.bind(this));
    return customers.filter(function(customer, index){
      return customers.indexOf(customer) >= index;
    });
  }
  static byPrice() {
    return store.meals.sort(function(meal1, meal2) {
      console.log(meal1.price, meal2.price);
      if (meal1.price > meal2.price) {
        return -1
      } else if (meal1.price < meal2.price) {
        return +1;
      }
      return 0;
    });
  }
}

// Deliveries
let deliveryId = 0;
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId;
    }.bind(this));
  }
  customer() {
    return store.customers.find(function(customer) {
      return customer.id === this.customerId;
    }.bind(this));
  }
  neighborhood() {
    return store.neighborhoods.find(function(neighborhood) {
      return neighborhood.id === this.neighborhoodId;
    }.bind(this));
  }
}
