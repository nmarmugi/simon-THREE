import Robot from "./Robot.js";

export default class FlyingRobot extends Robot { // Possiamo anche creare nuove classi partendo da un'altra classe, come in questo caso che partiamo da Robot e possiamo accedere alle proprieta' che sono dentro Robot.
    takeOff() { // Possiamo anche aggiungere nuove proprieta' come la funzione takeOff, con il this possiamo continuare ad accedere alle proprieta' di Robot
        console.log(`Have a good flight ${this.name}`)
    }
}