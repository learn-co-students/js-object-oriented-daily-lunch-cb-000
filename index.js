let store = {
  deliveries: [],
  meals: [],
  employers: [],
  customers: []
}

let deliveriesId = 0
let mealsId = 0
let employersId = 0
let customersId = 0

class Delivery {
  constructor(meal = 0, customer = 0) {
    this.id = ++deliveriesId
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }

  customer() {
    return store.customers.find(function(customer){
      return customer.id === this.customerId
    }.bind(this))
  }

  meal() {
    return store.meals.find(function(meal){
      return meal.id === this.mealId
    }.bind(this))
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealsId,
    this.title = title

    if(price) {
      this.price = price
    }

    store.meals.push(this)
  }
  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price
    })
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.mealId === this.id
    }.bind(this))
  }

  customers() {
    return this.deliveries().map(function(delivery) {
      return delivery.customer()
    }.bind(this))
  }
}

class Employer {
  constructor(name) {
    this.id = ++employersId
    this.name = name

    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(function(customer) {
      return customer.employerId === this.id
    }.bind(this))
  }

  deliveries() {
    return this.employees().reduce(function(total, employee) {
      return total.concat(employee.deliveries())
    }.bind(this), [])
  }

  allMeals() {
    return this.employees().reduce(function(total, employee) {
      return total.concat(employee.meals())
    }.bind(this), [])

  }

  meals() {
    let meals = this.allMeals()
    return meals.reduce(function(total, meal) {
      if(total.find(function(m) {
        return m.title === meal.title
      })) {
        return total
      } else {
        return total.concat(meal)
      }

    }, [])
  }
  mealTotals() {
    let meals = this.allMeals()
    let totals = {}
    meals.forEach(function(meal) {
      if(meal.id in totals){
        totals[meal.id] = totals[meal.id] + 1
      } else {
        totals[meal.id] = 1
      }
    })
    return totals
  }
}

class Customer {
  constructor(name, employer=0) {
    this.id = ++customersId
    this.name = name
    this.employerId = employer.id

    store.customers.push(this)
  }
  totalSpent(){
    return this.meals().reduce(function(total, meal) {
      return total + meal.price
    }.bind(this), 0)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.customerId === this.id
    }.bind(this))
  }

  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal()
    }.bind(this))
  }
}
