export default class Robot { // Classe di definisce in PascalCase
    constructor(name, legs) { // Il costruttore viene invocato nel momento in cui diamo valore a una variabile. Esempio: const ultron = new Robot('Ultron', 2);
        this.name = name;
        this.legs = legs;
    }

    sayHi() { // Possiamo passare chiavi che hanno valori, come la funzione sayHi
        console.log(`Hi! My name is ${this.name}.`)
    }
}