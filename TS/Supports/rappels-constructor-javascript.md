# Héritage en JS et TypeScript

Selon le langage utilisé vous avez des particularités à considérer sur l'héritage. On précise cela en JS et TypeScript, approche identique tout à fait logique puisque TypeScript est un sur-ensemble de Javascript.

### En JavaScript :
En JavaScript, si l'on définit une classe fille qui hérite d'une classe mère et que l'on souhaite redéfinir des propriétés dans le constructeur de la classe fille, il est nécessaire d'appeler le constructeur parent via `super()`. Cela est obligatoire lorsque la classe fille a un constructeur.

Voici les points essentiels :
1. **Appel à `super()`** : Lorsque le constructeur est présent dans une classe fille, il faut appeler `super()` avant d'accéder au mot-clé `this`. L'appel à `super()` invoque le constructeur de la classe mère.
2. **Redéfinir des propriétés** : Après l'appel à `super()`, on peut redéfinir ou ajouter des propriétés spécifiques à la classe fille.

### Exemple :
```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // Appel au constructeur parent
    this.age = age; // Propriété spécifique à Child
  }
}

const child = new Child("Alice", 10);
console.log(child.name); // Alice
console.log(child.age);  // 10
```

Si `super()` est omis dans le constructeur de la classe fille, cela générera une erreur.

---

### En TypeScript :
En TypeScript, le comportement est très similaire à celui de JavaScript. Lorsque l'on crée une classe qui hérite d'une autre, si le constructeur est redéfini dans la classe fille, il est nécessaire d'appeler `super()` pour invoquer le constructeur de la classe mère avant d'utiliser `this`.

### Exemple TypeScript :
```typescript
class Parent {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

class Child extends Parent {
  private age: number;

  constructor(name: string, age: number) {
    super(name); // Appel au constructeur de la classe Parent
    this.age = age; // Propriété spécifique à Child
  }

  greet() {
    super.greet(); // Appel à la méthode greet() du parent
    console.log(`I am ${this.age} years old`);
  }
}

const child = new Child("Alice", 10);
child.greet();
// Résultat : 
// Hello, my name is Alice
// I am 10 years old
```

### Points clés :
- **Appel à `super()` dans le constructeur** : Comme en JavaScript, il est nécessaire d'appeler `super()` avant d'utiliser `this` dans le constructeur de la classe fille.
- **Redéfinition des méthodes** : Dans l'exemple ci-dessus, la méthode `greet()` est redéfinie dans la classe `Child`, mais on peut appeler la méthode du parent avec `super.greet()` si nécessaire.

Cela fonctionne de la même manière en TypeScript, avec le typage statique pour garantir une structure et une robustesse accrues du code.