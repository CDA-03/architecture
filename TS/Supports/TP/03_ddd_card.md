# Projet 

#### Configuration installation

[configuration](./00_preparation.md)

Voici une adaptation de votre exercice en suivant les principes de la **Clean Architecture**. Ce TP va aboutir à la création d'une application de gestion de cartes de produits avec une partie backend (conformément à la Clean Architecture) et une partie frontend pour l'interaction utilisateur. 

### **Enoncé du TP : Gestion de Cartes de Produits avec la Clean Architecture**

L'objectif est de créer une application permettant aux utilisateurs de gérer des produits dans un panier en respectant les principes de la **Clean Architecture**. L'application sera séparée en différentes couches avec une partie **backend** (API REST) et une partie **frontend** (interface utilisateur).

#### **Cahier des charges**
1. Créer une interface `Storable` pour représenter le stockage des produits.
2. Implémenter deux types de stockage : `LocalStorage` et `InMemoryStorage`.
3. Créer une entité `Product` qui représentera un produit avec un nom et un prix.
4. Créer une classe `Cart` qui dépend d’un stockage via une abstraction (l’interface `Storable`).
5. Permettre d'ajouter des produits dans le panier, d'afficher le total des produits et de gérer le panier.
6. Ajouter un **Frontend** qui communique avec l'API pour gérer les produits dans le panier.

---

### **Structure du Projet**

```bash
/src
  ├── Entities
  │   └── Product.ts
  ├── UseCases
  │   └── AddProductToCart.ts
  │   └── GetCartTotal.ts
  ├── Interfaces
  │   └── Storable.ts
  ├── Repositories
  │   └── InMemoryStorage.ts
  │   └── LocalStorage.ts
  ├── Controllers
  │   └── CartController.ts
  ├── server.ts
/frontend
  ├── src
      └── components
          └── CartComponent.tsx
          └── ProductComponent.tsx
      └── services
          └── CartService.ts
  └── public
      └── index.html
```

---

### **Backend - Partie API**

#### 1. **Entities/Product.ts**

```typescript
// Entities/Product.ts
export class Product {
    constructor(public name: string, public price: number) {}
}
```

#### 2. **Interfaces/Storable.ts**

```typescript
// Interfaces/Storable.ts
import { Product } from '../Entities/Product';

export interface Storable {
    addProduct(product: Product): void;
    getProducts(): Product[];
    getTotalPrice(): number;
}
```

#### 3. **Repositories/InMemoryStorage.ts**

```typescript
// Repositories/InMemoryStorage.ts
import { Product } from '../Entities/Product';
import { Storable } from '../Interfaces/Storable';

export class InMemoryStorage implements Storable {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    getProducts(): Product[] {
        return this.products;
    }

    getTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}
```

#### 4. **Repositories/LocalStorage.ts**

```typescript
// Repositories/LocalStorage.ts
import { Product } from '../Entities/Product';
import { Storable } from '../Interfaces/Storable';

export class LocalStorage implements Storable {
    private storageKey = 'cart';

    addProduct(product: Product): void {
        const products = this.getProducts();
        products.push(product);
        localStorage.setItem(this.storageKey, JSON.stringify(products));
    }

    getProducts(): Product[] {
        const storedProducts = localStorage.getItem(this.storageKey);
        return storedProducts ? JSON.parse(storedProducts) : [];
    }

    getTotalPrice(): number {
        return this.getProducts().reduce((total, product) => total + product.price, 0);
    }
}
```

#### 5. **UseCases/AddProductToCart.ts**

```typescript
// UseCases/AddProductToCart.ts
import { Product } from '../Entities/Product';
import { Storable } from '../Interfaces/Storable';

export class AddProductToCart {
    constructor(private storage: Storable) {}

    execute(product: Product): void {
        this.storage.addProduct(product);
    }
}
```

#### 6. **UseCases/GetCartTotal.ts**

```typescript
// UseCases/GetCartTotal.ts
import { Storable } from '../Interfaces/Storable';

export class GetCartTotal {
    constructor(private storage: Storable) {}

    execute(): number {
        return this.storage.getTotalPrice();
    }
}
```

#### 7. **Controllers/CartController.ts**

```typescript
// Controllers/CartController.ts
import { Request, Response } from 'express';
import { AddProductToCart } from '../UseCases/AddProductToCart';
import { GetCartTotal } from '../UseCases/GetCartTotal';
import { Product } from '../Entities/Product';
import { Storable } from '../Interfaces/Storable';

export class CartController {
    constructor(private storage: Storable) {}

    addProduct(req: Request, res: Response): void {
        const { name, price } = req.body;
        const product = new Product(name, price);
        const addProductUseCase = new AddProductToCart(this.storage);
        addProductUseCase.execute(product);
        res.status(200).send('Product added to cart');
    }

    getTotal(req: Request, res: Response): void {
        const getTotalUseCase = new GetCartTotal(this.storage);
        const total = getTotalUseCase.execute();
        res.status(200).json({ total });
    }
}
```

#### 8. **server.ts**

```typescript
// server.ts
import express from 'express';
import { InMemoryStorage } from './Repositories/InMemoryStorage';
import { CartController } from './Controllers/CartController';

const app = express();
app.use(express.json());

const storage = new InMemoryStorage(); // Vous pouvez changer pour LocalStorage
const cartController = new CartController(storage);

app.post('/cart/products', (req, res) => cartController.addProduct(req, res));
app.get('/cart/total', (req, res) => cartController.getTotal(req, res));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

---

### **Frontend - Partie Application**

#### 1. **CartService.ts**

```typescript
// frontend/src/services/CartService.ts
export async function addProductToCart(name: string, price: number) {
    await fetch('/cart/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price }),
    });
}

export async function getCartTotal() {
    const response = await fetch('/cart/total');
    const data = await response.json();
    return data.total;
}
```

#### 2. **CartComponent.tsx**

```tsx
// frontend/src/components/CartComponent.tsx
import React, { useState, useEffect } from 'react';
import { getCartTotal } from '../services/CartService';

export const CartComponent: React.FC = () => {
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        async function fetchTotal() {
            const totalPrice = await getCartTotal();
            setTotal(totalPrice);
        }
        fetchTotal();
    }, []);

    return <div>Total du panier: {total} €</div>;
};
```

#### 3. **ProductComponent.tsx**

```tsx
// frontend/src/components/ProductComponent.tsx
import React, { useState } from 'react';
import { addProductToCart } from '../services/CartService';

export const ProductComponent: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addProductToCart(name, price);
        setName('');
        setPrice(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nom du produit"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Prix"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />
            <button type="submit">Ajouter au panier</button>
        </form>
    );
};
```

#### 4. **index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cart Application</title>
</head>
<body>
    <div id="root"></div>
    <script src="bundle.js"></script>
</body>
</html>
```

---

### **Instructions pour exécuter le TP**

1. **Backend** :
   - Installer les dépendances : `npm install express`
   - Démarrer le serveur : `npm run start`

2. **Frontend** :
   - Créer une application React : `npx create-react-app frontend`
   - Ajouter les composants et services dans le dossier `frontend/src`
   - Démarrer le frontend : `npm run start` dans le dossier `frontend`

### **Conclusion**

Ce TP vous permet de mettre en pratique les principes de la Clean Architecture en créant une application complète avec séparation claire des couches (Entités, Cas d'usage, Répositories, Interface utilisateur). La partie frontend interagit avec l'API REST pour gérer les produits dans le panier.