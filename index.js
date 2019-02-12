// global datastore
let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};

// Neighborhood class
// -------------------------------
let neighborhoodId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    });
  }

  meals() {
    const allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });

    const uniqueMealReducer = function(meals, currentMeal) {
      if (meals.indexOf(currentMeal) === -1) {
        meals.push(currentMeal);
      }

      return meals;
    }

    return allMeals.reduce(uniqueMealReducer, []);
  }
}

// Customer class
// -------------------------------
let customerId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent() {
    const priceTotaller = function(total, currentMeal) {
      return total + currentMeal.price;
    }

    return this.meals().reduce(priceTotaller, 0);
  }
}

// Meal class
// -------------------------------
let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  static byPrice() {
    const priceSorter = function(mealA, mealB) {
      return mealB.price - mealA.price;
    };

    return store.meals.sort(priceSorter);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;;
    });
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }
}

// Delivery class
// -------------------------------
let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id == this.customerId;
    });
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }
}
