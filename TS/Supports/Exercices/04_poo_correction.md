# POO 

## **Exercice 1 : Gestion d'un compte bancaire avec encapsulation**
Créez une classe `BankAccount` qui respecte les principes d'encapsulation.

### Instructions :
1. Ajoutez une propriété `balance` privée dans la classe.
2. Implémentez des méthodes `deposit(amount: number)` et `withdraw(amount: number)` pour ajouter ou retirer de l'argent du compte. Assurez-vous qu'il n'est pas possible de retirer plus que le solde actuel.
3. Créez un getter `getBalance()` pour afficher le solde actuel.

### Exemple attendu :
```typescript
class BankAccount {
    private balance: number = 0;

    deposit(amount: number) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    withdraw(amount: number) {
        if (amount <= this.balance) {
            this.balance -= amount;
        } else {
            console.log("Fonds insuffisants");
        }
    }

    getBalance() {
        return this.balance;
    }
}

const account = new BankAccount();
account.deposit(200);
account.withdraw(50);
console.log(account.getBalance()); // 150
```
