import { Jogo } from "../Jogo.js";

export class Peca {
	constructor() {
		if (this.constructor == Peca) {
			throw new Error("Nao pode instanciar esse objeto");
		}
		this.elemento = HTMLSpanElement; //Estará assciado a uma posicao do array Jogo.casa
	}

	mostrarDisponiveis() {}

	casas_topo_direita(linha, coluna) {
		let casas = [];
		let iteracoes = 8 - coluna;
		for (linha--, coluna++; iteracoes > 0; linha--, coluna++, iteracoes--) {
			casas.push(Jogo.obterCasa(linha, coluna));
		}
		return casas;
	}

	casas_topo_esquerda(linha, coluna) {
		let casas = [];
		for (linha--, coluna--; coluna >= 0; linha--, coluna--) {
			casas.push(Jogo.obterCasa(linha, coluna));
		}
		return casas;
	}

	casas_baixo_direita(linha, coluna) {
		let casas = [];
		let iteracoes = 8 - coluna;
		for (linha++, coluna++; iteracoes > 0; linha++, coluna++, iteracoes--) {
			casas.push(Jogo.obterCasa(linha, coluna));
		}
		return casas;
	}

	casas_baixo_esquerda(linha, coluna) {
		let casas = [];
		for (linha++, coluna--; coluna >= 0; linha++, coluna--) {
			casas.push(Jogo.obterCasa(linha, coluna));
		}
		return casas;
	}

	casas_a_Frente(linha, coluna) {
		let casas = [];
		for (linha--; linha >= 0; linha--) {
			casas.push(Jogo.obterCasa(linha, coluna));
		}
		return casas;
	}

	casas_a_tras(linha, coluna) {
		let casas = [];
		for (linha++; linha < 8; linha++) {
			casas.push(Jogo.obterCasa(linha, coluna));
		}
		return casas;
	}

	casas_a_direita(linha, coluna) {
		let casas = [];
		for (coluna++; coluna < 8; coluna++) {
			casas.push(Jogo.obterCasa(linha, coluna));
		}
		return casas;
	}

	casas_a_esquerda(linha, coluna) {
		let casas = [];
		for (coluna--; coluna >= 0; coluna--) {
			casas.push(Jogo.obterCasa(linha, coluna));
		}
		return casas;
	}

	marcarEmSequencia(casas, bloquearNoUltimo = false) {
		for (let i = 0; i < casas.length; i++) {
			const casa = casas[i];
			if (Jogo.casaEstaOcupada(casa)) {
				if (Jogo.corEhDiferente(this.elemento, casa.childNodes[0])) {
					// Pode ser simplificado mas eu prefiro deixar assim
					Jogo.marcar(casa, true);
					if (!bloquearNoUltimo) return;
				}
				if (!bloquearNoUltimo) return;
			}
			Jogo.marcar(casa);
		}
	}
}
