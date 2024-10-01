import { InMemoryStorage } from './Services/InMemoryStorage'
import { Cart } from './Services/Cart'
import { Vegetable } from './Entities/Vegetable'

// les données dans la base de données (fake)

const cart = new Cart(new InMemoryStorage)

const v1 = new Vegetable('Apple', 2)

cart.buy(v1, 3)
cart.buy(v1, 5)

console.log(cart.show())