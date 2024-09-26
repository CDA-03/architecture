# SOLID 

## **1. Single Responsibility Principle (SRP)**

Chaque classe doit avoir une **seule** responsabilité, c'est-à-dire une seule raison de changer.

Le principe de "Single Responsibility Principle" (SRP) stipule que chaque classe ou module doit avoir **une seule raison de changer**. Cela signifie que chaque classe devrait se concentrer sur **une seule fonctionnalité** ou **responsabilité**. Si une classe a plusieurs responsabilités, elle pourrait devoir être modifiée pour différentes raisons, ce qui rendrait le code plus difficile à maintenir.

Prenons un exemple simple : imaginons une classe `UserService` qui gère à la fois l'authentification des utilisateurs et l'envoi d'e-mails de confirmation. 

Si l'entreprise décide de changer la façon dont les utilisateurs sont authentifiés (ajout d'une authentification à deux facteurs, par exemple), vous devrez modifier la classe. Si un autre changement survient, comme une nouvelle mise en forme des e-mails, vous devrez aussi modifier la même classe. Cela violerait le principe de responsabilité unique.

Une meilleure approche serait d'avoir deux classes distinctes :
- `AuthenticationService` : pour gérer l'authentification.
- `EmailService` : pour gérer l'envoi d'e-mails.

Ainsi, chaque classe n'aurait qu'une seule raison de changer :
- `AuthenticationService` changerait si la logique d'authentification évoluait.
- `EmailService` changerait si la manière d'envoyer les e-mails changeait.

Cela rend le code plus modulaire, plus facile à maintenir et à tester.

### Un exemple qui respecte ce principe SRP

```typescript
class User {
    constructor(private _name: string, private _email: string) {}

    // Getter pour le nom
    get name(): string {
        return this._name;
    }

    // Setter pour le nom
    set name(value: string) {
        this._name = value;
    }

    // Getter pour l'email
    get email(): string {
        return this._email;
    }

    // Setter pour l'email
    set email(value: string) {
        this._email = value;
    }
}


class UserRepository {
    private users: User[] = [];

    addUser(user: User) {
        this.users.push(user);
    }

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }
}

class UserService {
    constructor(private userRepository: UserRepository) {}

    createUser(name: string, email: string) {
        const user = new User(name, email);
        this.userRepository.addUser(user);
    }

    getUserByEmail(email: string): User | undefined {
        return this.userRepository.findUser(email);
    }
}
```

### Compléter les responsabilités ?? 

Dans cet exemple, chaque classe a une responsabilité unique :
- `User` gère les données d'un utilisateur.
- `UserRepository` gère la persistance des utilisateurs.
- `UserService` gère la logique métier liée aux utilisateurs.

---

## **2. Open/Closed Principle (OCP)**

Les classes doivent être **ouvertes à l'extension** mais **fermées à la modification**.

### Exemple :

```typescript
// Classe de base
class Shape {
    area(): number {
        throw new Error("Method not implemented.");
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super();
    }

    area(): number {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class AreaCalculator {
    calculate(shapes: Shape[]): number {
        return shapes.reduce((total, shape) => total + shape.area(), 0);
    }
}

const shapes: Shape[] = [new Rectangle(5, 10), new Circle(7)];
const calculator = new AreaCalculator();
console.log(calculator.calculate(shapes)); // Calcule la surface totale
```

Ici, on peut ajouter de nouvelles formes (comme `Square`, `Triangle`) sans modifier la classe `AreaCalculator`, simplement en héritant de la classe `Shape`.

---

## **3. Liskov Substitution Principle (LSP)**

Les objets d'une sous-classe doivent pouvoir être remplacés par des objets de la classe parent sans affecter le comportement du programme.

### Bon Exemple :

```typescript
class Bird {
    fly() {
        console.log("Flying");
    }
}

class Sparrow extends Bird {
    fly() {
        console.log("Sparrow flying");
    }
}

function letBirdFly(bird: Bird) {
    bird.fly();
}

const sparrow = new Sparrow();
letBirdFly(sparrow); // "Sparrow flying"
```

Dans cet exemple, `Sparrow` peut remplacer `Bird` sans causer de problème au niveau du comportement attendu. Cela respecte le principe de substitution de Liskov.

Voici un autre exemple du **principe de substitution de Liskov (LSP)**, avec uniquement des classes.

### Contexte : Gestion de classes Product et Bike

Quand on dit qu'une sous-classe est **substituable** à sa classe parent (comme le décrit le principe de substitution de Liskov - LSP), cela signifie que l'on doit pouvoir remplacer la classe parent par une sous-classe sans modifier le comportement du programme.

### Mauvais Exemple (pour contexte) :

```typescript
class Product {
    constructor(private _price: number, private _name: string) {}

    // Getter pour le prix
    get price(): number {
        return this._price;
    }

    // Setter pour le prix
    set price(value: number) {
        if (value <= 0) {
            throw new Error("Le prix doit être supérieur à 0.");
        }
        this._price = value;
    }

    // Getter pour le nom
    get name(): string {
        return this._name;
    }

    // Setter pour le nom
    set name(value: string) {
        if (!value) {
            throw new Error("Le nom ne peut pas être vide.");
        }
        this._name = value;
    }

    promo(per : number):void{
        this._price = this._price * (1 - per / 100)
    }
}

class Bike extends Product{
    promo(per : number, coeff : number ):void{
        this.price = this.price * (1 - per / 100)
    }
}
```

Le principe de Liskov stipule que les objets d'une classe dérivée doivent pouvoir être utilisés à la place des objets de la classe de base sans altérer le comportement attendu du programme.

Dans ta classe de **parent** Product, la méthode promo() prend un seul paramètre per (le pourcentage de réduction), tandis que dans la classe dérivée Bike, on modifie cette méthode pour qu'elle accepte deux paramètres : per et coeff de manière obligatoire. Cela change la signature de la méthode et introduit une incompatibilité.

**Problème spécifique**

De manière générale vous allez avoir des problèmes dans votre code...Si une instance de Bike est utilisée là où une instance de Product est attendue, le code qui appelle la méthode promo() s'attendrait à un seul argument, mais Bike.promo() attend deux arguments, ce qui entraînerait des erreurs ou des comportements inattendus.

### Deux solutions possibles 

On peut repenser la structure pour que chaque classe fonctionne correctement avec le principe de substitution, deux approches sont possibles, soit respecter effectivement le nombre de paramètre de la méthode définit dans le parent, soit éventuellement ajouter un/des paramètre(s) facultatif(s)

- Avec paramètre(s) facultatif(s) on ne brise pas le principe de LSP.

```typescript

class Bike extends Product {
    // Ajout d'un paramètre facultatif coeff
    promo(per: number, coeff?: number): void {
        const effectiveCoeff = coeff ? coeff : 1; // Coeff par défaut est 1
        this.price = this.price * (1 - per * effectiveCoeff / 100);
    }
}
```

- On ne change pas le nombre de paramètre

```typescript

class Bike extends Product {
    // Ajout d'un paramètre facultatif coeff
    promo(per: number): void {

        const effectiveCoeff =  0.4; 
        this.price = this.price * (1 - per * effectiveCoeff / 100);
    }
}
```
Dans la méthode promo() de Bike, le paramètre coeff est facultatif (coeff?: number). Si le paramètre coeff n'est pas fourni, la valeur par défaut de coeff sera 1, ce qui signifie que la réduction sera calculée de manière standard comme dans la classe Product.

Ce code respecte le LSP car la signature de la méthode promo() dans Bike reste compatible avec celle de la classe Product : si on n'utilise pas le second paramètre, le comportement reste conforme à celui attendu dans Product.

---

## **4. Interface Segregation Principle (ISP)**
Les clients ne doivent pas être forcés de dépendre d'interfaces qu'ils n'utilisent pas. Une interface large doit être divisée en plusieurs interfaces spécifiques.

Cela indique que les classes ne doivent pas être forcées de dépendre d'interfaces dont elles n'ont pas besoin. Si une interface est trop large, elle doit être divisée en interfaces plus petites et spécifiques pour éviter d'imposer aux classes des méthodes inutiles.

### Bon Exemple :

```typescript
interface Workable {
    work(): void;
}

interface Eatable {
    eat(): void;
}

class HumanWorker implements Workable, Eatable {
    work() {
        console.log("Human working");
    }

    eat() {
        console.log("Human eating");
    }
}

class RobotWorker implements Workable {
    work() {
        console.log("Robot working");
    }
}
```

Ici, `HumanWorker` implémente à la fois `Workable` et `Eatable`, tandis que `RobotWorker` n'implémente que `Workable`, car il ne mange pas. Cela permet d'éviter que les classes ne soient forcées d'implémenter des méthodes inutiles.

---

## **5. Dependency Inversion Principle (DIP)**
Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau. Les deux doivent dépendre d'abstractions.

### Bon Exemple :

```typescript
interface Database {
    save(data: string): void;
}

class MySQLDatabase implements Database {
    save(data: string) {
        console.log(`Saving data in MySQL: ${data}`);
    }
}

class MongoDBDatabase implements Database {
    save(data: string) {
        console.log(`Saving data in MongoDB: ${data}`);
    }
}

class DataManager {
    constructor(private database: Database) {}

    saveData(data: string) {
        this.database.save(data);
    }
}

const mysql = new MySQLDatabase();
const mongo = new MongoDBDatabase();
const dataManager = new DataManager(mysql);
dataManager.saveData("User data"); // Utilisation avec MySQL
```

Dans cet exemple, `DataManager` dépend de l'interface `Database` et non d'une implémentation spécifique comme `MySQLDatabase` ou `MongoDBDatabase`. Cela permet de changer la base de données utilisée sans modifier la logique de `DataManager`.

---

### **Résumé :**

En suivant les principes SOLID dans TypeScript ou dans un langage utilisant le paradigme objet (comme PHP) :
- Vous obtenez un code plus modulaire et extensible.
- Vous réduisez les risques d'erreurs lors des changements ou des ajouts de nouvelles fonctionnalités.
- Vous facilitez la maintenance et la lisibilité du code.
