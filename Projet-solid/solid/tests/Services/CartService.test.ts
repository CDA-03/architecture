import { InMemoryStorage } from '../../src/Services/InMemoryStorage'
import { Vegetable } from '../../src/Entities/Vegetable'
import { Cart } from '../../src/Services/Cart'

describe('Cart functionality', () => {

  let cart: Cart;

  beforeEach(() => {
    // dans l'absolu InMemoryStorage devrait-être remplacé par un Mock
    cart = new Cart(new InMemoryStorage)  // Nouvelle instance avant chaque test
  });

  test('should add a product to the cart', () => {
    const product = new Vegetable('Apple', 2); // 2 euros
    cart.buy(product , 3);

    expect(cart.show()[0].name).toBe('Apple');
    expect(cart.show().length).toBe(1);
    expect(cart.show()[0].price).toBe(3*2);
  });

  test('should increase the quantity of an existing product in the cart', () => {
    const vegetable1 = new Vegetable('Apple', 2); // Ajout de 1 pommes
    const vegetable2 = new Vegetable('Apple', 2); // Ajout de 1 pommes supplémentaires

    cart.buy(vegetable1, 3);
    cart.buy(vegetable2, 2); 

    expect(cart.show().length).toBe(1); // Toujours un seul type de produit
    expect(cart.total()).toBe(3*2 + 2*2); // Quantité combinée

    // de manière identique on peut aussi utiliser le même objet pour commander 
    cart.buy(vegetable1, 3);
    cart.buy(vegetable1, 3);
    expect(cart.show().length).toBe(1); 
  });

  test('should calculate the total price of the cart', () => {
    const vegetable1 = new Vegetable('Apple', 1); // Ajout de 1 pommes
    const vegetable2 = new Vegetable('Banana', 2); // Ajout de 1 pommes supplémentaires

    cart.buy(vegetable1, 3);
    cart.buy(vegetable2, 2); 

    expect(cart.total()).toBe(1*3 + 2*2); 
  });

  test('should remove a product from the cart', () => {
    const vegetable1 = new Vegetable('Apple', 2);
    const vegetable2 = new Vegetable('Banana', 1);

    cart.buy(vegetable1, 2);
    cart.buy(vegetable2, 2);

    cart.restore(vegetable1); // Retirer les pommes

    expect(cart.show().length).toBe(1); // Il ne reste qu'un produit
    expect(cart.show()[0].name).toBe('Banana'); // Les bananes sont toujours là
  });

  test('should return 0 as total price for an empty cart', () => {
    expect(cart.total()).toBe(0); // Panier vide, total = 0
  });

  test('should reset Cart return 0 as total price', () => {
    const vegetable1 = new Vegetable('Apple', 2);
    const vegetable2 = new Vegetable('Banana', 1);

    cart.buy(vegetable1, 2);
    cart.buy(vegetable2, 2);

    cart.reset()

    expect(cart.total()).toBe(0); // Panier vide, total = 0
  });

});
