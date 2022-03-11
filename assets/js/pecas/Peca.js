import { Jogo } from "../Jogo.js";

export class Peca {
    constructor() {
        if (this.constructor == Peca) {
            throw new Error("Nao pode instanciar esse objeto")
        }
        this.elemento = HTMLSpanElement //Estará assciado a uma posicao do array Jogo.casa
    }

    mostrarDisponiveis() {
        
    }

    marcarEmSequencia(casas) {
		for (let i = 0; i < casas.length; i++) {
			const casa = casas[i];
			if (Jogo.casaEstaOcupada(casa)) {
				if (
					Jogo.corEhDiferente(
						this.elemento,
						casa.childNodes[0]
					)
				) {
					// Pode ser simplificado mas eu prefiro deixar assim
					Jogo.marcar(casa, true);
					return;
				}
				return;
			}
			Jogo.marcar(casa);
		}
	}

}