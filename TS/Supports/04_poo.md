# Principes de création de classes en TypeScript

Lorsque vous travaillez avec des classes en TypeScript, voici quelques principes essentiels à respecter pour structurer et organiser votre code de manière efficace :

## 1. **Encapsulation**

L'**encapsulation** signifie que les données d'un objet (ses propriétés) ne doivent être accessibles que via des méthodes spécifiques (getters et setters) ou via des modificateurs d'accès bien définis (**public**, **private**, **protected**). Cela permet de protéger l'intégrité des données et d'encapsuler la logique métier au sein de la classe.

**Principe** : Protéger l'accès aux données sensibles et n'exposer que les parties nécessaires.

```typescript
class BankAccount {
    private balance: number = 0; // Propriété privée, inaccessible de l'extérieur

    deposit(amount: number) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    getBalance() {
        return this.balance;
    }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
// account.balance; // Erreur : Propriété 'balance' est privée
```

- Un exemple plus long

```ts
class BankAccount {
    private balance: number = 0; // Propriété privée, inaccessible de l'extérieur
    public amount : number = 100 ; // pp accessible de partout

    protected name : String = "Alice";

    deposit(amount: number) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    getBalance() {
        return this.balance;
    }

}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100

// account.balance  // impossible

account.amount = -100


class Amount extends BankAccount{

    getName():String{
        // console.log(this.balance) // on ne peut accéder aux pp private de la classe parente
        return this.name 
    }
}

const UserAmount = new Amount;

console.log( UserAmount.getName() )
```

## 2. **Constructeur minimaliste**

Un **constructeur** doit être utilisé pour initialiser une instance de classe. Évitez de surcharger le constructeur avec trop de logique. La logique métier complexe doit être déléguée à d'autres méthodes.

**Principe** : Le constructeur ne doit faire que l'initialisation et non pas la gestion de la logique métier.

```typescript
class User {
    constructor(private name: string, private age: number) {
        // Ne fait que l'initialisation
    }
    
    greet() {
        return `Hello, I am ${this.name}, ${this.age} years old.`;
    }
}

const user = new User("Alice", 30);
console.log(user.greet());
```

```ts

// constructeur est minimaliste

class User {
    constructor(private name: string, private age: number) {
        // Ne fait que l'initialisation

    }
    
    greet() {
        return `Hello, I am ${this.name}, ${this.age} years old.`;
    }
}

const user = new User("Alice", 30);
console.log(user.greet());


class Model{
    private table : string ;

    constructor(table : string){
        this.table = table ;
    }

    getTable():string{

        return this.table ;
    }
}

console.log( (new Model('table')).getTable() )
```

## 3. **Responsabilité unique (Single Responsibility Principle)**

Chaque classe doit avoir une responsabilité unique et bien définie. Évitez de créer des classes "fourre-tout" qui gèrent plusieurs responsabilités.

**Principe** : Chaque classe doit être responsable d'une seule chose.

Exemple : Si vous avez une classe qui gère à la fois la logique de calcul et l'affichage des résultats, il est préférable de les séparer en deux classes distinctes.

```typescript
class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
}

class Display {
    printResult(result: number) {
        console.log(`The result is: ${result}`);
    }
}

const calc = new Calculator();
const display = new Display();

const result = calc.add(2, 3);
display.printResult(result); // "The result is: 5"
```

## 4. **Polymorphisme**

Le **polymorphisme** permet à des classes dérivées de substituer leur propre comportement à celui de la classe parent. Cela permet d'adapter le comportement des objets selon leur type, sans avoir besoin de connaître leur implémentation précise.

**Principe** : Les méthodes redéfinies dans les classes dérivées doivent toujours respecter le contrat défini dans la classe parent.

```typescript
class Animal {
    makeSound(): String {
        return "Some sound";
    }
}

class Dog extends Animal {
    makeSound(): String {
        return "Woof!";
    }
}

class Cat extends Animal {
    makeSound(): String {
        return "Meow!";
    }
}

export const animals: Animal[] = [new Dog(), new Cat()];

for (const animal of animals) 
    console.log(animal.makeSound())


```

---

## Principes d'héritage en TypeScript

L'**héritage** permet de créer des classes qui réutilisent, étendent ou modifient le comportement d'autres classes. Voici les principes fondamentaux à respecter :

## 1. **Favoriser la composition plutôt que l'héritage**

Bien que l'héritage soit une solution efficace pour réutiliser du code, il peut parfois mener à une forte dépendance entre classes. Préférez la **composition** (combiner des objets pour former une fonctionnalité) lorsque c'est possible, afin de rendre vos classes plus modulaires et réutilisables.

**Principe** : Utilisez l'héritage uniquement lorsqu'il y a une vraie relation parent-enfant.

```typescript
class Engine {
    start() {
        console.log("Engine started");
    }
}

class Car {
    engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    start() {
        this.engine.start();
        console.log("Car started");
    }
}

const engine = new Engine();
const car = new Car(engine);
car.start(); // "Engine started" puis "Car started"
```

## 2. **Protéger les méthodes sensibles avec `protected`**

Utilisez le modificateur **protected** pour protéger certaines méthodes de la classe parent, afin qu'elles soient accessibles uniquement par les sous-classes, mais pas directement par les instances.

**Principe** : Protéger les méthodes internes ou sensibles tout en permettant l'accès aux sous-classes.

```typescript
class Vehicle {
    protected move():void {
        console.log("Moving");
    }
}

class Bike extends Vehicle {
    ride():void {
        this.move(); // OK : `move` est accessible dans une sous-classe
    }
}

const bike = new Bike();
bike.ride(); // "Moving"
```

---

## Les Interfaces en TypeScript

Les **interfaces** définissent la structure que doit respecter un objet ou une classe sans fournir d'implémentation. Voici les principes clés associés aux interfaces :

## 1. **Interface comme contrat**

Les interfaces agissent comme un **contrat** qui impose à une classe ou un objet de respecter une certaine structure, mais ne fournit aucune implémentation. Cela est utile pour garantir une certaine cohérence dans le code.

**Principe** : Utilisez les interfaces pour définir des contrats que les classes doivent respecter.

```typescript
interface Flyable {
    fly(): void;
}

class Bird implements Flyable {
    fly() {
        console.log("Bird is flying");
    }
}

class Airplane implements Flyable {
    fly() {
        console.log("Airplane is flying");
    }
}

const flyingObjects: Flyable[] = [new Bird(), new Airplane()];
flyingObjects.forEach(obj => obj.fly());
// "Bird is flying"
// "Airplane is flying"
```

## 2. **Réutilisation avec les interfaces**

Les interfaces facilitent la réutilisation de code en imposant une structure commune à plusieurs classes, sans les forcer à hériter d'une même classe parente.

**Principe** : Utilisez des interfaces pour définir des comportements communs.

```typescript
interface Movable {
    move(): void;
}

class Robot implements Movable {
    move() {
        console.log("Robot is moving");
    }
}

class Human implements Movable {
    move() {
        console.log("Human is walking");
    }
}
```

## 3. **Interfaces avec des propriétés optionnelles**

Une interface peut contenir des **propriétés optionnelles** pour donner plus de flexibilité.

**Principe** : Utilisez des propriétés optionnelles pour décrire des objets ayant des attributs facultatifs.

```typescript
interface Car {
    make: string;
    model: string;
    year?: number; // Propriété optionnelle
}

const myCar: Car = {
    make: "Toyota",
    model: "Corolla"
}; // Pas d'erreur, `year` est optionnelle
```

---

## Classes Abstraites

Les **classes abstraites** sont des classes qui ne peuvent pas être instanciées directement. Elles servent de base pour d'autres classes et peuvent contenir des méthodes abstraites, qui doivent être définies dans les sous-classes.

## 1. **Utilisation des classes abstraites pour structurer le code**

Les classes abstraites sont utiles lorsque vous avez des classes dérivées qui partagent des comportements communs mais nécessitent également des méthodes spécifiques. Les méthodes abstraites doivent être implémentées dans les sous-classes.

**Principe** : Utilisez des classes abstraites pour définir des modèles généraux de classes, avec des comportements communs et spécifiques.

```typescript
abstract class Employee {
    constructor(public name: string) {}

    abstract getSalary(): number; // Méthode abstraite

    describe() {
        return `Employee: ${this.name}`;
    }
}

class FullTimeEmployee extends Employee {
    getSalary() {
        return 5000; // Implémentation spécifique
    }
}

class PartTimeEmployee extends Employee {
    getSalary() {
        return 2000; // Implémentation spécifique
    }
}

const employee1 = new FullTimeEmployee("Alice");
console.log(employee1.describe()); // "Employee: Alice"
console.log(employee1.getSalary()); // 5000
```

## 2. **Ne pas confondre interfaces et classes abstraites**

Contrairement aux interfaces, les classes abstraites peuvent avoir des méthodes concrètes (implémentées) et des propriétés. Utilisez des interfaces pour définir uniquement des contrats, et des classes abstraites lorsqu'il y a un besoin d'héritage avec des méthodes partiellement implémentées.

**Principe** : Utilisez une interface lorsque vous n'avez pas besoin d'implément

ation, et une classe abstraite pour définir des comportements communs.
.

