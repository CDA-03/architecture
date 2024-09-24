
// Readonly précision 
class A {
    readonly a : string = "a"
}

// (new A).a = 10 

console.log( (new A).a )

interface B {
    readonly a : string ;
    b? : number ;
}

let X : B = { a : "Bonjour" }
let Y : B = { a : "Coucou", b : 100 }

console.log(X.a)

// X.a = "b"

type D = {
    name : String;
    color : String ;
    age? : number; 
}

let c : Readonly<D> = {
    name : "Alice",
    color : "green",
    age : 18
}

// c.name = "Franck"

interface SupDuck{
    name : String;
    color : String ;
    age? : number; // optionnel 
}

interface M {
    stage : number
}

// Vous pouvez définir des types partials c-a-d toutes les propriétés optionelles
// type OptionDuck = Partial<SupDuck & M>  

// let ca : OptionDuck = {

// }

const ducks : Readonly<SupDuck>[] = [
    { name : "Alice", color : "green"},
    { name : "Alan", color : "white", age : 45},
]

// ducks[0].name = "John"

console.log(ducks)