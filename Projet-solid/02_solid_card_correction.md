# Contexte de l'Exercice

Vous devez implémenter un système de panier d'achat. Ce système devra permettre d'ajouter, de retirer et de visualiser des produits. Les produits seront stockés dans un système de stockage qui pourrait être local (pour l'exercice, on peut utiliser un tableau). Le panier doit respecter les principes SOLID.

### Classes à Créer

1. **Product** : Représente un produit.
2. **Cart** : Représente le panier.
3. **Storage** : Gère le stockage des produits.
4. **CartService** : Gère les opérations sur le panier.
5. **StorageService** : Gère les opérations de stockage.

### Implémentation

```typescript
// 1. Product class
class Product {
    constructor(public id: number, public name: string, public price: number) {}
}

// 2. Cart class
class Cart {
    private items: Product[] = [];

    addProduct(product: Product) {
        this.items.push(product);
    }

    removeProduct(productId: number) {
        this.items = this.items.filter(item => item.id !== productId);
    }

    getItems(): Product[] {
        return this.items;
    }

    getTotal(): number {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
}

// 3. Storage class
class Storage {
    private products: Product[] = [];

    addProduct(product: Product) {
        this.products.push(product);
    }

    getProductById(productId: number): Product | undefined {
        return this.products.find(product => product.id === productId);
    }

    getAllProducts(): Product[] {
        return this.products;
    }
}

// 4. CartService class
class CartService {
    constructor(private cart: Cart) {}

    addToCart(product: Product) {
        this.cart.addProduct(product);
    }

    removeFromCart(productId: number) {
        this.cart.removeProduct(productId);
    }

    getCartItems(): Product[] {
        return this.cart.getItems();
    }

    getCartTotal(): number {
        return this.cart.getTotal();
    }
}

// 5. StorageService class
class StorageService {
    constructor(private storage: Storage) {}

    addProductToStorage(product: Product) {
        this.storage.addProduct(product);
    }

    getProduct(productId: number): Product | undefined {
        return this.storage.getProductById(productId);
    }

    getAllProducts(): Product[] {
        return this.storage.getAllProducts();
    }
}

// Exemple d'utilisation
const storage = new Storage();
const cart = new Cart();
const storageService = new StorageService(storage);
const cartService = new CartService(cart);

// Ajout de produits au stockage
storageService.addProductToStorage(new Product(1, "Apple", 0.5));
storageService.addProductToStorage(new Product(2, "Banana", 0.3));

// Ajout de produits au panier
const apple = storageService.getProduct(1);
if (apple) {
    cartService.addToCart(apple);
}

const banana = storageService.getProduct(2);
if (banana) {
    cartService.addToCart(banana);
}

// Afficher les articles du panier et le total
console.log("Items in cart:", cartService.getCartItems());
console.log("Total:", cartService.getCartTotal());
```

### Explication

- **Single Responsibility Principle (SRP)** : Chaque classe a une responsabilité unique. Par exemple, `Product` gère uniquement les détails d'un produit, `Cart` gère les opérations sur le panier, `Storage` gère le stockage des produits, etc.
- **Open/Closed Principle (OCP)** : Les classes peuvent être étendues sans modification. Par exemple, si nous souhaitons ajouter des fonctionnalités de réduction ou de promotions, nous pouvons créer de nouvelles classes sans modifier celles existantes.
- **Liskov Substitution Principle (LSP)** : Les sous-classes peuvent remplacer les classes parent sans modifier le comportement attendu. Si nous avions besoin de sous-classes spécifiques de `Product` (comme `DiscountedProduct`), cela pourrait être fait sans affecter le reste du code.
- **Interface Segregation Principle (ISP)** : Les clients n'ont pas à dépendre d'interfaces qu'ils n'utilisent pas. Dans notre cas, nous pourrions envisager de séparer les services de stockage et de panier si cela devenait trop complexe.
- **Dependency Inversion Principle (DIP)** : Les classes dépendent d'abstractions (comme les interfaces), plutôt que d'implémentations concrètes. Cela peut être appliqué en introduisant des interfaces pour les services de panier et de stockage, ce qui faciliterait les tests unitaires.

### Tâches à Réaliser

1. Créez une nouvelle classe pour gérer les réductions sur les produits (en respectant les principes SOLID).
2. Ajoutez des méthodes pour gérer les quantités des produits dans le panier.
3. Implémentez des tests unitaires pour chaque classe afin de vérifier le bon fonctionnement du système.

Cet exercice est conçu pour aider les étudiants à comprendre comment appliquer les principes SOLID dans un projet pratique.