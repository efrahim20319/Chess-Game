import { Peca } from "./Peca.js";
import { Jogo } from "../Jogo.js";

export class Bispo extends Peca {
	constructor() {
		super();
	}

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
        let iteracoes = 8 - coluna
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

	mostrarDisponiveis(bispo) {
		this.elemento = bispo;
		Jogo.desmarcarTudo();
		bispo.setAttribute("data-marcador", "");
		const [linha, coluna] = Jogo.obetrPosicao(bispo.parentNode);
		const casas_topo_direita = this.casas_topo_direita(linha, coluna);
		const casas_topo_esquerda = this.casas_topo_esquerda(linha, coluna);
		const casas_baixo_direita = this.casas_baixo_direita(linha, coluna);
		const casas_baixo_esquerda = this.casas_baixo_esquerda(linha, coluna);
		this.marcarEmSequencia(casas_topo_direita);
		this.marcarEmSequencia(casas_topo_esquerda);
		this.marcarEmSequencia(casas_baixo_direita);
		this.marcarEmSequencia(casas_baixo_esquerda);

		Jogo.prepararMovimento();
	}
}
