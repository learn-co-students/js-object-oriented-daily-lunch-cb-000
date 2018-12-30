// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let newNeighborhoodId = 0;
class Neighborhood {
    constructor(name) {
        this.id = ++newNeighborhoodId;
        this.name = name;
        store.neighborhoods.push(this);
    }

    deliveries() {
        return store.deliveries.filter((delivery) => {
            return this.id === delivery.neighborhoodId;
        });
    }

    customers() {
        return store.customers.filter((customer) => {
            return this.id === customer.neighborhoodId;
        });
    }

    meals() {
        const allMeals = this.deliveries().map((delivery) => {
            return store.meals.find((meal) => {
                return meal.id === delivery.mealId;
            });
        });

        return allMeals.filter((v, i, a) => a.indexOf(v) === i);
    }
}

let newMealId = 0;
class Meal {
    constructor(title, price) {
        this.id = ++newMealId;
        this.title = title;
        this.price = price;
        store.meals.push(this);
    }

    deliveries() {
        return store.deliveries.filter((delivery) => {
            return delivery.mealId === this.id;
        });
    }

    customers() {
        return this.deliveries().map((delivery) => {
            return store.customers.find((customer) => {
                return customer.id === delivery.customerId;
            });
        });
    }

    static byPrice() {
        return store.meals.sort((a, b) => {
            return b.price - a.price;
        });
    }
}

let newCustomerId = 0;
class Customer {
    setNeighborhood(neighborhoodId) {
        this.neighborhoodId = neighborhoodId;
    }

    constructor(name, neighborhoodId) {
        this.id = ++newCustomerId;
        this.name = name;
        if (neighborhoodId) {
            this.setNeighborhood(neighborhoodId);
        }
        store.customers.push(this);
    }

    deliveries() {
        return store.deliveries.filter((delivery) => {
            return delivery.customerId === this.id;
        });
    }

    meals() {
        return this.deliveries().map((delivery) => {
            return store.meals.find((meal) => {
                return meal.id === delivery.mealId;
            });
        });
    }

    totalSpent() {
        return this.meals().reduce((acc, meal) => {
            return acc + meal.price;
        }, 0);
    }
}

let newDeliveryId = 0;
class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++newDeliveryId;
        this.mealId = mealId;
        this.customerId = customerId;
        this.neighborhoodId = neighborhoodId;
        store.deliveries.push(this);
    }

    meal() {
        return store.meals.find((meal) => {
            return meal.id === this.mealId;
        });
    }

    customer() {
        return store.customers.find((customer) => {
            return customer.id === this.customerId;
        });
    }

    neighborhood() {
        return store.neighborhoods.find((neighborhood) => {
            return neighborhood.id === this.neighborhoodId;
        });
    }
}