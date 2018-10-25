// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery =>delivery.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  meals() {
    let thisMeals = this.deliveries().map(delivery => delivery.meal());
    return [...new Set(thisMeals)];
  }
}

let mealId = 0;
class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery =>delivery.mealId === this.id);
  }

  customers() {
    let thisCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(thisCustomers)];
  }

  static byPrice() {
    return store.meals.sort((a, b) => (b.price - a.price));
  }
}

let customerId = 0;
class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    if (neighborhoodId) {this.neighborhoodId = neighborhoodId;};

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    return this.meals().map(meal => (meal.price)).reduce((a, b) => a + b);
  }
}

let deliveryId = 0;
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    if (mealId) {this.mealId = mealId;};
    if (neighborhoodId) {this.neighborhoodId = neighborhoodId;};
    if (customerId) {this.customerId = customerId;};

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
