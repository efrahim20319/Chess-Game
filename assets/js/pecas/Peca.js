
class Peca {
    constructor() {
        if (this.constructor == Peca) {
            throw new Error("Nao pode instanciar esse objeto")
        }
        this.elemento = HTMLSpanElement //Estará assciado a uma posicao do array Jogo.casa
    }

    mostrarDisponiveis() {
        
    }

}