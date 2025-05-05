import EventEmitter from "./EventEmitter.js";

export default class Sizes extends EventEmitter {
    constructor() {
        super(); // Siccome usaimo un costruttore personalizzato nella sotto classe Sizes allora usiamo super(), che serve per: Richiamare il costruttore della classe padre (EventEmitter). Consentire a Sizes di comportarsi anche come un EventEmitter, ereditando i suoi metodi ed eventi.
        // Setup
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        // Resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);

            this.trigger('resize');
        })
    }
}