### Qu'est-ce qu'une **interface** en TypeScript ?

En TypeScript, une **interface** est un contrat qui définit la forme que doivent respecter les objets ou les classes qui l'implémentent. Elle peut décrire la structure d’un objet, comme ses propriétés et ses méthodes, sans fournir d’implémentation.

Une interface ne génère pas de code à la compilation (contrairement aux classes), elle sert uniquement à vérifier que les types correspondent correctement.

### Exemple de base d'une interface :

```typescript
interface User {
    name: string;
    age: number;
    greet(): void;
}
```

Cette interface impose à tout objet de type `User` d'avoir :
- Une propriété `name` de type `string`,
- Une propriété `age` de type `number`,
- Une méthode `greet()` qui ne prend aucun argument et ne retourne rien (`void`).

### Implémentation d'une interface par une classe :

```typescript
class Person implements User {
    constructor(public name: string, public age: number) {}

    greet(): void {
        console.log(`Hello, my name is ${this.name}`);
    }
}
```

Dans cet exemple, la classe `Person` implémente l'interface `User`. Cela signifie qu'elle **doit** avoir une propriété `name`, une propriété `age`, et la méthode `greet()` pour être conforme à l'interface.

### **Paramètres de méthodes dans une interface**

Les méthodes dans une interface peuvent avoir des paramètres, tout comme les méthodes dans les classes. Cependant, TypeScript permet une certaine flexibilité quant à la manière dont les classes implémentent ces méthodes.

#### Exemples de méthodes avec des paramètres dans une interface :

```typescript
interface Storable {
    set(price: number, name: string): void;
}

```

Ici, la méthode `set` de l'interface `Storable` exige deux paramètres :
- `price` (de type `number`),
- `name` (de type `string`).

### **Pourquoi la signature de méthode peut être plus flexible dans les classes ?**

En TypeScript, il existe une règle de **compatibilité structurelle** qui permet une certaine flexibilité dans les signatures de méthodes, notamment au niveau des **paramètres facultatifs** ou **variadiques**. Cela signifie qu'une méthode dans une classe peut avoir :
- **Moins de paramètres** que ce qui est défini dans l'interface (les paramètres supplémentaires seront ignorés),
- **Plus de paramètres** que ce qui est attendu (mais les paramètres supplémentaires ne seront pas utilisés par l'appelant).

#### Exemple de flexibilité dans les signatures de méthode :

```typescript
class StorageSession implements Storable {
    set(price: number): void {  // Moins de paramètres
        console.log(price);
    }
}

class StorageDB implements Storable {
    set(): void {  // Aucun paramètre
        console.log("Cleared all storage");
    }
}
```

Dans cet exemple, les classes `StorageSession` et `StorageDB` n'implémentent pas strictement la signature de la méthode `set` définie dans l'interface `Storable`. Malgré cela, TypeScript accepte ces implémentations.

### **Pourquoi TypeScript accepte-t-il cela ?**

TypeScript utilise la **compatibilité structurelle** pour déterminer si une classe est compatible avec une interface. Cela signifie que si la méthode dans la classe accepte **moins** de paramètres que la méthode dans l'interface, TypeScript considérera toujours cela comme valide, car dans le cadre de l'exécution JavaScript, les paramètres supplémentaires ne sont tout simplement pas utilisés.

Cette flexibilité permet d'éviter des erreurs inutiles dans des cas où tous les paramètres ne sont pas toujours nécessaires ou utilisés.

### **Forcer une stricte correspondance des signatures de méthode**

Si tu souhaites empêcher ce comportement flexible et forcer les classes à **implémenter exactement** la même signature que celle de l'interface, tu dois activer certaines options de configuration dans TypeScript :

- **`strictFunctionTypes`** : Cette option permet de rendre plus strictes les signatures de fonction et oblige à respecter les types des paramètres dans les méthodes.
- **`strict`** : Active toutes les options strictes, y compris `strictFunctionTypes`.

Dans ton fichier `tsconfig.json`, cela ressemble à :

```json
{
  "compilerOptions": {
    "strict": true,
    "strictFunctionTypes": true
  }
}
```

### Exemple avec vérification stricte des signatures :

```typescript
interface Storable {
    set(price: number, name: string): void;
}

class StorageSession implements Storable {
    set(price: number): void {  // Erreur de compilation car la signature est différente
        console.log(price);
    }
}
```

Avec l'option `strictFunctionTypes` activée, TypeScript générera une erreur, car la méthode `set` dans la classe `StorageSession` n'accepte pas le bon nombre de paramètres.

### Résumé de la notion d'interface et des paramètres dans une interface

1. **Interface** : Un contrat qui décrit la structure que doit respecter un objet ou une classe. Elle définit des propriétés et des méthodes, mais n'implémente pas de logique.
   
2. **Implémentation d'une interface** : Lorsqu'une classe implémente une interface, elle doit respecter la structure définie dans celle-ci. Cependant, par défaut, TypeScript permet une certaine flexibilité dans la signature des méthodes.

3. **Compatibilité structurelle** : TypeScript considère qu'une méthode avec moins de paramètres est toujours compatible avec une interface qui en demande plus. C'est une des raisons pour lesquelles les classes peuvent sembler ne pas respecter strictement les interfaces.

4. **Forcer la stricte correspondance des signatures** : En activant `strictFunctionTypes` et d'autres options strictes dans `tsconfig.json`, tu peux forcer les classes à implémenter **exactement** la signature définie dans l'interface, y compris le nombre et le type des paramètres.

Cela te permet d'utiliser TypeScript à un niveau de rigueur plus élevé, si nécessaire.