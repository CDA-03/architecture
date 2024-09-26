### Exercice SOLID : Panier, Stockage et Produits en TypeScript

L'objectif de cet exercice est de mettre en pratique les **principes SOLID** en créant un système de gestion de panier d'achat avec des produits, un stockage de données, et la possibilité d'ajouter ou de retirer des articles du panier.

#### Configuration installation

[configuration](./00_preparation.md)

#### Contexte :

Vous devez créer trois principales entités :
- `Product` (Produit) : Représente un article avec un nom et un prix.
- `Cart` (Panier) : Contient les produits ajoutés par l'utilisateur.
- `StorageArray` (Stockage) : Représente le mécanisme de persistance (local storage, base de données, etc.).

### Contraintes :
- Le système doit suivre les **principes SOLID**.
- Utilisez les interfaces et/ou classes abstraites pour garantir un design modulaire et extensible.
- Il doit être facile d'ajouter de nouveaux types de stockage (par exemple, un stockage en mémoire ou un stockage dans une base de données) sans modifier le code existant.

### Exercice

#### 1. **Single Responsibility Principle (SRP)** :
Chaque classe doit avoir une seule responsabilité (par exemple, gérer un produit, le panier, ou le stockage).

#### 2. **Open/Closed Principle (OCP)** :
Le code doit être ouvert à l'extension (ajouter de nouvelles fonctionnalités comme un nouveau type de stockage), mais fermé à la modification (pas besoin de modifier les classes existantes).

#### 3. **Liskov Substitution Principle (LSP)** :
Les classes dérivées (par exemple, différents types de stockage) doivent pouvoir être utilisées de manière interchangeable sans altérer le comportement.

#### 4. **Interface Segregation Principle (ISP)** :
Les interfaces ne doivent pas forcer les classes à implémenter des méthodes inutiles.

#### 5. **Dependency Inversion Principle (DIP)** :
Les modules de haut niveau (comme le panier) ne doivent pas dépendre directement des modules de bas niveau (comme le stockage). Ils doivent tous deux dépendre d'abstractions.

### Consignes de l'exercice :

1. Créez une interface `Storable` qui représente le comportement attendu d'un stockage.
2. Implémentez une des deux classes (InMemoryStorage) pour l'instant, réfléchissez aux deux systèmes de stockage : `LocalStorage` et `InMemoryStorage` ( un array suffira ).
3. Créez une classe `Product` avec un nom et un prix.
4. Créez une classe `Cart` qui dépend d'un stockage via une abstraction (l'interface `Storable`).
5. Ajoutez des produits dans le panier et affichez le total des articles dans le panier.
