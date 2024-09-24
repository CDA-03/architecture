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

## 4. **Types conditionnels**

Les types conditionnels permettent de créer des types basés sur d'autres types.

```typescript
type IsString<T> = T extends string ? "Yes" : "No";

type Test1 = IsString<string>; // "Yes"
type Test2 = IsString<number>; // "No"
```

## 5. **Mapped Types**

Les types mappés permettent de créer des nouveaux types basés sur des types existants.

```typescript
type User = {
    name: string;
    age: number;
};

type ReadOnly<T> = {
    readonly [K in keyof T]: T[K];
};

type ReadOnlyUser = ReadOnly<User>;

const user: ReadOnlyUser = {
    name: "Alice",
    age: 30,
};

// user.name = "Bob"; // Erreur : Cannot assign to 'name' because it is a read-only property
```

## 6. **Types d'index**

Les types d'index vous permettent d'accéder aux propriétés d'un type.

```typescript
type Person = {
    name: string;
    age: number;
};

type NameType = Person["name"]; // string
```

Cela est utile lorsque vous voulez obtenir le type d'une propriété d'un objet.

## 7. **Fonctions de type**

Vous pouvez définir des types pour les fonctions, ce qui vous permet de spécifier les types des paramètres et le type de retour.

```typescript
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => `Hello, ${name}!`;
```

## 8. **Types avec `this`**

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

## 9. **Utilisation de `keyof`**

`keyof` est un opérateur qui permet de créer un type à partir des clés d'un objet.

```typescript
type Person = {
    name: string;
    age: number;
};

type PersonKeys = keyof Person; // "name" | "age"
```

Cela peut être utile pour des fonctions génériques qui manipulent des objets.

### Conclusion

Ces concepts avancés de TypeScript vous offrent une flexibilité et une puissance considérables pour créer des applications robustes et maintenables. En utilisant des types union, intersection, génériques et conditionnels, vous pouvez créer des systèmes de types très riches qui s'adaptent à vos besoins.

Dans les prochaines sections, nous pourrions explorer des fonctionnalités supplémentaires, telles que les décorateurs, les classes et l'intégration de TypeScript avec des bibliothèques JavaScript existantes. Si vous avez des questions ou si vous souhaitez approfondir un sujet spécifique, n'hésitez pas à le faire savoir !