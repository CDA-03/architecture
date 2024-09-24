# Exercices typage TS

### **Exercice 1 : Créer un type générique pour un Duck**
Objectif : Créer un type générique représentant un canard qui peut avoir différentes caractéristiques. Utiliser les types génériques et les contraintes.

**Enoncé :**
Créer un type générique `Duck<T>` qui représente un canard avec des caractéristiques spécifiques, comme le type de bec (`billType`), la couleur (`color`), ou le nombre de pattes (`legs`). Le type générique doit permettre de définir les propriétés du canard de manière flexible.


**Question :**
- Ajouter une autre propriété à l’interface des caractéristiques du canard (par exemple, `canFly: boolean`).
- Comment limiter le type générique à des caractéristiques précises, sans permettre des valeurs arbitraires ?

---

### **Exercice 2 : Gestion d'un groupe de canards avec des types utilitaires**
Objectif : Utiliser des types utilitaires comme `Partial` et `Readonly` pour gérer un groupe de canards.

**Enoncé :**
Il faut gérer un groupe de canards pour une réserve naturelle. Parfois, certaines informations sur les canards manquent, ou certaines propriétés doivent être immuables.

- Créer un tableau de canards où certaines informations sont optionnelles (par exemple, leur âge peut ne pas être connu).
- Les canards recensés ne peuvent plus changer de couleur (ils doivent être en lecture seule).

**Question :**
- Comment garantir que le nom du canard soit obligatoire, mais que le reste soit partiellement facultatif ?
- Ajouter un type générique pour étendre les propriétés de base du canard.

---

### **Exercice 3 : Implémenter un comportement différent pour chaque type de Duck**
Objectif : Utiliser les types de discriminants et les unions de types pour gérer des canards avec des comportements différents.

**Enoncé :**
Différents types de canards ont des comportements spécifiques (par exemple, un canard sauvage et un canard domestique). Utiliser les types discriminants pour implémenter des méthodes spécifiques pour chaque type.

```typescript
// Créer des types discriminants pour les canards
type WildDuck = {
    type: "wild";
    habitat: string;
};

type DomesticDuck = {
    type: "domestic";
    owner: string;
};

// Union de types pour les canards
type Duck = WildDuck | DomesticDuck;

// Fonction qui gère différents comportements en fonction du type de canard
function describeDuck(duck: Duck) {
    switch (duck.type) {
        case "wild":
            console.log(`This is a wild duck that lives in ${duck.habitat}`);
            break;
        case "domestic":
            console.log(`This is a domestic duck owned by ${duck.owner}`);
            break;
    }
}

// Exemple d'utilisation
describeDuck({ type: "wild", habitat: "forest" });
describeDuck({ type: "domestic", owner: "John" });
```

**Question :**
- Ajouter un nouveau type de canard (`robotic`) qui n'a ni propriétaire ni habitat, mais une version logicielle (`softwareVersion`). Adapter la fonction `describeDuck` pour gérer ce nouveau type.

---

### **Exercice 4 : Créer une classe abstraite Duck avec des méthodes génériques**
Objectif : Utiliser des classes abstraites avec des méthodes génériques pour implémenter un comportement commun aux canards, tout en permettant des spécialisations.

**Enoncé :**
Créer une classe abstraite `Duck` qui force les sous-classes à implémenter la méthode `fly()`. Cette méthode peut utiliser des types génériques pour gérer différents types de vols (par exemple, vol rapide, vol lent).

```typescript
// Classe abstraite Duck
abstract class Duck<T> {
    constructor(public name: string) {}

    // Méthode abstraite pour voler
    abstract fly(speed: T): void;

    quack(): void {
        console.log(`${this.name} is quacking`);
    }
}

// Classe dérivée WildDuck avec un type spécifique pour le vol
class WildDuck extends Duck<number> {
    fly(speed: number): void {
        console.log(`${this.name} is flying at ${speed} km/h`);
    }
}

// Classe dérivée DomesticDuck avec un autre type pour le vol
class DomesticDuck extends Duck<string> {
    fly(speed: string): void {
        console.log(`${this.name} is flying at a ${speed} speed`);
    }
}

// Exemple d'utilisation
const wildDuck = new WildDuck("Wild Duck");
wildDuck.fly(50);

const domesticDuck = new DomesticDuck("Domestic Duck");
domesticDuck.fly("slow");
```

**Question :**
- Comment étendre la classe Duck pour ajouter une méthode générique permettant de gérer d'autres comportements communs à toutes les sous-classes, comme le mode de nage (`swim`) ?

---
