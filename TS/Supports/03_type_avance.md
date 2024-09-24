# Types Avancés dans TypeScript

## 1. **Types Union et Intersection**

- **Types Union** (`|`)

Les types union permettent de spécifier qu'une variable peut être de plusieurs types.

```typescript
function printId(id: number | string) {
    console.log(`Your ID is: ${id}`);
}

printId(101); // OK
printId("202"); // OK
```

- **Types Intersection** (`&`)

Les types intersection permettent de combiner plusieurs types en un seul. Cela est utile lorsque vous voulez que quelque chose ait toutes les propriétés de plusieurs types.

```typescript
interface User {
    name: string;
    age: number;
}

interface Address {
    street: string;
    city: string;
}

type UserWithAddress = User & Address;

const user: UserWithAddress = {
    name: "Alice",
    age: 30,
    street: "123 Main St",
    city: "Wonderland"
};
```

## 2. **Types Génériques**

Les types génériques permettent de créer des composants réutilisables qui fonctionnent avec n'importe quel type de données.

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("Hello, World");
let numberOutput = identity<number>(42);
```

Les génériques sont très utiles avec les collections ou les interfaces.

```typescript
interface GenericBox<T> {
    content: T;
}

const box: GenericBox<string> = { content: "Hello" };
```

### Exercice

Créez une fonction **tri**, bien typée, qui trie par ordre croissant ou décroissant un tableau de numérique ou de string. 

#### Correction

```ts
enum Order {
    ASC,
    DESC
}

type Data = number[] | string[]

function tri(data: Data, order: Order = Order.ASC): Data | never {

    // on test si la variable firstElem existe data[0] || undefined, si elle n'existe pas  data[0] JS exécute undefined
    const firstElem: unknown = data[0] || undefined

    if (typeof firstElem === 'undefined') throw new Error("Tableau vide")

    if (typeof firstElem === 'string') {
        data.sort()

        return order === Order.DESC ? data.reverse() : data
    }

    data.sort((a, b) => a - b)

    return order === Order.DESC ? data.reverse() : data
}

console.log(tri(["a", "c", "b"]))
console.log(tri(["a", "c", "b"], Order.DESC))

console.log(tri([1, 7, 5, 10, 8]))
console.log(tri([1, 7, 5, 10, 8], Order.DESC))

try {
    // on capture l'exception 
    console.log(tri([], Order.DESC))
} catch (error) {
    console.error("Error fetching data:");
}
```

## 3. **Interfaces et Types**

Bien que `interface` et `type` soient souvent interchangeables, il existe des différences subtiles :

- **Interfaces** peuvent être étendues :

```typescript
interface Animal {
    name: string;
}

interface Dog extends Animal {
    bark: () => void;
}

const myDog: Dog = {
    name: "Rex",
    bark: () => console.log("Woof!")
};
```

- **Types** peuvent être utilisés pour créer des unions ou des intersections :

```typescript
type StringOrNumber = string | number;
```

## 4. **Mapped Types**

Les types mappés permettent de créer des nouveaux types basés sur des types existants.

```typescript
type User = {
    name: string;
    age: number;
};

// ReadOnly est un type prédéfini dans TypeScript 
type ReadOnlyUser = ReadOnly<User>;

const user: ReadOnlyUser = {
    name: "Alice",
    age: 30,
};

// user.name = "Bob"; // Erreur : Cannot assign to 'name' because it is a read-only property
```

## 5. **Types d'index**

Les types d'index vous permettent d'accéder aux propriétés d'un type.

```typescript
type Person = {
    name: string;
    age: number;
};

type NameType = Person["name"]; // string
```

Cela est utile lorsque vous voulez obtenir le type d'une propriété d'un objet.

## 6. **Fonctions de type**

Vous pouvez définir des types pour les fonctions, ce qui vous permet de spécifier les types des paramètres et le type de retour.

```typescript
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => `Hello, ${name}!`;
```

## 7. **Types avec `this`**

Les types avec `this` vous permettent de faire référence à l'instance actuelle d'une classe dans la déclaration de type.

```typescript
class Chainable {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    add(n: number): this {
        this.value += n;
        return this;
    }

    multiply(n: number): this {
        this.value *= n;
        return this;
    }
}

const result = new Chainable(2)
    .add(3)
    .multiply(4)
    .value; // result vaut 20
```

## 8. Le type partial

Le type `Partial` en TypeScript est un type utilitaire qui permet de rendre toutes les propriétés d'un type donné optionnelles. Cela signifie que vous pouvez créer un nouvel objet qui contient certaines, toutes, ou aucune des propriétés d'un type original sans être obligé de spécifier toutes les propriétés.


### Utilisation

Voici comment vous pouvez utiliser `Partial` :

1. **Définir un type** :

   ```typescript
   interface User {
       id: number;
       name: string;
       email: string;
   }
   ```

2. **Créer un type partiel** :

   ```typescript
   type PartialUser = Partial<User>;
   ```

   `PartialUser` est un type qui peut avoir n'importe quelle combinaison de `id`, `name`, et `email`, ou même aucune de ces propriétés.

3. **Utiliser le type partiel** :

   ```typescript
   const user1: PartialUser = {
       id: 1
   };

   const user2: PartialUser = {
       name: "Alice",
       email: "alice@example.com"
   };

   const user3: PartialUser = {}; // valide aussi
   ```

### Avantages

- **Flexibilité** : Vous permet de créer des objets sans avoir besoin de spécifier toutes les propriétés.
- **Facilite les mises à jour** : Utile lors de la mise à jour partielle d'objets, comme lors de l'envoi de données à une API.

### Exemples

Voici quelques exemples supplémentaires d'utilisation :

#### Exemple 1 : Mise à jour d'un utilisateur

```typescript
function updateUser(id: number, userUpdates: PartialUser) {
    // logique pour mettre à jour l'utilisateur
}

// Appel avec un objet partiel
updateUser(1, { name: "Bob" });
```

#### Exemple 2 : Création d'un objet

```typescript
const newUser: PartialUser = {
    email: "charlie@example.com"
};
```

En résumé, `Partial` est très utile pour créer des types flexibles dans vos applications TypeScript, surtout lors de la manipulation d'objets où toutes les propriétés ne sont pas toujours nécessaires.