# **QCM : Classes, Objets, Interfaces et Héritage en TypeScript**

## **1. Quelle est la principale caractéristique des classes en TypeScript ?**
- [ ] A) Elles ne peuvent contenir que des propriétés publiques.
- [ ] B) Elles permettent de définir des types d'objets avec des propriétés et des méthodes.
- [ ] C) Elles ne peuvent pas être héritées.
- [ ] D) Elles ne peuvent pas avoir de constructeur.

## **2. Quel modificateur d'accès rend une propriété accessible uniquement dans sa classe et les sous-classes ?**
- [ ] A) `private`
- [ ] B) `protected`
- [ ] C) `public`
- [ ] D) `readonly`

## **3. Quelle est la bonne syntaxe pour créer une interface en TypeScript ?**
- [ ] A) 
```typescript
interface Vehicle {
    wheels: number;
    move(): void;
}
```
- [ ] B) 
```typescript
class Vehicle implements wheels: number, move: () => void {};
```
- [ ] C) 
```typescript
interface Vehicle {
    private wheels: number;
    public move(): void;
}
```
- [ ] D)
```typescript
class Vehicle extends interface { wheels: number; move(): void; }
```

## **4. Que signifie le mot-clé `abstract` en TypeScript ?**
- [ ] A) C’est un type de classe qui ne peut être instanciée directement.
- [ ] B) C’est un modificateur qui empêche une classe d’avoir des méthodes publiques.
- [ ] C) C’est un type de méthode qui est toujours public.
- [ ] D) C’est une classe qui peut être utilisée uniquement dans des fonctions.

## **5. Comment pouvez-vous définir une méthode abstraite dans une classe abstraite ?**
- [ ] A) 
```typescript
abstract class Vehicle {
    move(): void { }
}
```
- [ ] B) 
```typescript
class Vehicle {
    abstract move(): void;
}
```
- [ ] C)
```typescript
abstract class Vehicle {
    abstract move(): void;
}
```
- [ ] D)
```typescript
interface Vehicle {
    abstract move(): void;
}
```

## **6. Quel est l'avantage de l'interface par rapport à la classe abstraite en TypeScript ?**
- [ ] A) Une interface peut avoir des méthodes concrètes.
- [ ] B) Une classe peut implémenter plusieurs interfaces.
- [ ] C) Une interface ne peut pas être étendue.
- [ ] D) Une interface permet d'instancier directement des objets.

## **7. Laquelle des propositions suivantes est correcte pour implémenter une interface ?**
- [ ] A) 
```typescript
class Bird implements Flyable {
    fly() {
        console.log("Flying");
    }
}
```
- [ ] B) 
```typescript
class Bird extends Flyable {
    fly() {
        console.log("Flying");
    }
}
```
- [ ] C) 
```typescript
class Bird implements new Flyable() {
    fly() {
        console.log("Flying");
    }
}
```
- [ ] D)
```typescript
class Bird extends new Flyable() {
    fly() {
        console.log("Flying");
    }
}
```

## **8. Quelle est la différence principale entre une interface et une classe abstraite ?**
- [ ] A) Une interface peut contenir des méthodes avec du code implémenté.
- [ ] B) Une interface ne peut pas être étendue par une autre interface.
- [ ] C) Une classe abstraite peut contenir des méthodes concrètes (avec implémentation), contrairement à une interface.
- [ ] D) Les classes ne peuvent pas implémenter des interfaces.

## **9. Comment pouvez-vous empêcher la modification d’une propriété après sa déclaration dans une classe ?**
- [ ] A) Utiliser le modificateur `const`.
- [ ] B) Utiliser le modificateur `static`.
- [ ] C) Utiliser le modificateur `readonly`.
- [ ] D) Utiliser le modificateur `final`.

## **10. Quel mot-clé permet de créer une classe enfant qui hérite d’une classe parent en TypeScript ?**
- [ ] A) `extend`
- [ ] B) `implement`
- [ ] C) `inherit`
- [ ] D) `extends`
