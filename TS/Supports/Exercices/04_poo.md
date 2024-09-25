# POO 

## **Exercice 1 : Gestion d'un compte bancaire avec encapsulation**
Créez une classe `BankAccount` qui respecte les principes d'encapsulation.

### Instructions :
1. Ajoutez une propriété `balance` privée dans la classe.
2. Implémentez des méthodes `deposit(amount: number)` et `withdraw(amount: number)` pour ajouter ou retirer de l'argent du compte. Assurez-vous qu'il n'est pas possible de retirer plus que le solde actuel.
3. Créez un getter `getBalance()` pour afficher le solde actuel.

--- 

## **Exercice 2 : Créer des objets avec un constructeur minimaliste**
Créez une classe `Person` qui utilise un constructeur minimaliste pour initialiser ses propriétés.

### Instructions :
1. La classe doit avoir deux propriétés privées `name` et `age`.
2. Implémentez une méthode `introduce()` qui renvoie une chaîne de caractères pour présenter la personne.
3. Instanciez des objets de la classe et utilisez la méthode `introduce()` pour les afficher.

---

## **Exercice 3 : Respect du principe de responsabilité unique**
Créez une classe `Rectangle` qui suit le principe de responsabilité unique (Single Responsibility Principle).

### Instructions :
1. Créez une classe `Rectangle` qui contient deux propriétés `width` et `height`.
2. Ajoutez une méthode `getArea()` pour calculer la surface du rectangle.
3. Créez une autre classe `Display` avec une méthode `printArea(rectangle: Rectangle)` pour afficher la surface du rectangle. Ne mélangez pas la logique de calcul et d'affichage.
4. Créez également une classe Square en utilisant les principes vus en cours.
