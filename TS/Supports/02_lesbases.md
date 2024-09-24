# Introduction à TypeScript - Les Types Basiques

**TypeScript** est un sur-ensemble de JavaScript qui ajoute des **types statiques** au langage. Cela signifie que TypeScript permet de spécifier et de vérifier les types de données, offrant ainsi une plus grande sécurité et robustesse au code.

Avec la version **5.6** de TypeScript, de nouvelles fonctionnalités ont été introduites pour améliorer encore la gestion des types, mais les concepts fondamentaux restent essentiels. Dans cette introduction, nous allons explorer les types de base disponibles dans TypeScript et leur importance pour l'écriture d'un code fiable et maintenable.

### Pourquoi utiliser TypeScript ?

Avant de plonger dans les types basiques, il est essentiel de comprendre pourquoi TypeScript est largement utilisé :

- **Sécurité de type** : TypeScript réduit les erreurs liées aux types, comme celles que vous pourriez rencontrer avec JavaScript lorsque des données incorrectes sont manipulées.
- **Meilleure documentation** : Les annotations de type dans le code font office de documentation, facilitant la compréhension du code par d'autres développeurs (ou vous-même, plus tard !).
- **Outillage** : Les éditeurs de texte, comme Visual Studio Code, bénéficient d'une complétion automatique plus intelligente et d'une meilleure vérification des erreurs grâce à TypeScript.

### Les Types Basiques dans TypeScript

Les types basiques de TypeScript permettent de définir des données simples que vous manipulez couramment dans vos applications. Voici un aperçu des types les plus importants.

#### 1. **`number`** - Les nombres

Comme en JavaScript, TypeScript utilise un seul type pour les nombres, qu'ils soient entiers ou flottants.

```typescript
let age: number = 25;
let temperature: number = 36.6;
```

Tous les calculs mathématiques et les manipulations de nombres s'effectuent de la même manière qu'en JavaScript.

#### 2. **`string`** - Les chaînes de caractères

Les chaînes de caractères en TypeScript sont équivalentes à celles de JavaScript, mais avec l'avantage de la sécurité de type.

```typescript
let firstName: string = "Alice";
let message: string = `Bonjour, ${firstName}!`;
```

On peut utiliser les guillemets simples, doubles, ou les templates strings (avec backticks ``).

#### 3. **`boolean`** - Les valeurs booléennes

Les booléens permettent de représenter des valeurs vraies ou fausses.

```typescript
let isActive: boolean = true;
let hasPermission: boolean = false;
```

#### 4. **`array`** - Les tableaux

Les tableaux en TypeScript peuvent contenir des éléments de types homogènes ou hétérogènes, selon le besoin. Il y a deux façons de déclarer un tableau :

- Utilisation des crochets `[]` :

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
```

- Utilisation de l'objet générique `Array` :

```typescript
let fruits: Array<string> = ["Apple", "Banana", "Cherry"];
```

#### 5. **`tuple`** - Les tuples

Les tuples permettent de déclarer un tableau dont chaque élément peut avoir un type spécifique. Cela permet de définir des structures de données plus strictes.

```typescript
let coordinates: [number, number] = [40.7128, -74.0060]; // Tuple avec deux nombres
let userInfo: [string, number] = ["Alice", 30]; // Tuple avec une chaîne et un nombre
```

#### 6. **`enum`** - Les énumérations

Les énumérations (ou `enum`) permettent de définir un ensemble de valeurs nommées. C'est particulièrement utile pour représenter des choix ou des états limités.

```typescript
enum Status {
    Pending,
    Approved,
    Rejected
}

let currentStatus: Status = Status.Pending;
```

Les énumérations sont automatiquement indexées, commençant à `0` par défaut. Il est également possible de leur assigner des valeurs spécifiques.

#### 7. **`any`** - Le type flexible

Le type `any` permet de désactiver la vérification de type. Il doit être utilisé avec prudence, car il rend la sécurité de type inutile, ce qui peut entraîner des erreurs.

```typescript
let randomValue: any = 42;
randomValue = "Hello"; // Pas d'erreur même si le type change
```

#### 8. **`unknown`** - Le type plus sûr que `any`

`unknown` est similaire à `any`, mais il oblige à effectuer une vérification de type avant de l'utiliser, offrant une meilleure sécurité.

```typescript
let value: unknown = "Hello";

if (typeof value === "string") {
    console.log(value.toUpperCase()); // TypeScript sait maintenant que c'est une chaîne
}
```

#### 9. **`void`** - Absence de type

`void` est souvent utilisé pour indiquer qu'une fonction ne renvoie rien.

```typescript
function logMessage(message: string): void {
    console.log(message);
}
```

#### 10. **`null` et `undefined`**

`null` et `undefined` sont deux types spécifiques qui représentent l'absence de valeur.

```typescript
let nullable: string | null = null;
let notDefined: undefined = undefined;
```

En TypeScript, vous pouvez spécifiquement indiquer que des variables ou des valeurs peuvent être `null` ou `undefined` en les combinant avec d'autres types à l'aide du pipe (`|`).

### 11. **`never`** - Type de valeurs impossibles

Le type `never` est utilisé pour représenter des valeurs qui ne devraient jamais exister. Il est souvent utilisé dans les fonctions qui ne terminent jamais (comme les exceptions ou les boucles infinies).

```typescript
function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
}
```
