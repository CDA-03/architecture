

interface Duck<T> {
    name: string;
    quack(): string; // une fonction qui retourne un chaine de caractère(s) 
    features: T; // permet de définir des caractéristiques typées à la définition de la variable
}


const m: Duck<{ billType: String ; legs: number }> = {
    name: "Mallard",
    quack() {
        return "Quack Quack";
    },
    features: {
        billType: "flat",
        legs: 2
    }
};


console.log(m.features)