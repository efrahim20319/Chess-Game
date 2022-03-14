import { Jogo } from "../Jogo.js";
import { Peca } from "./Peca.js";

export class Rei extends Peca {
	constructor() {
		super();
	}

	mostrarDisponiveis() {
		Jogo.desmarcarTudo();
		this.elemento.setAttribute("data-marcador", "");
		const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentNode);
		const casa_a_tras = Jogo.obterCasa(linha + 1, coluna);
		const casa_a_frente = Jogo.obterCasa(linha - 1, coluna);
		const casa_a_direita = Jogo.obterCasa(linha, coluna + 1);
		const casa_a_esquerda = Jogo.obterCasa(linha, coluna - 1);
		const casa_topo_direita = Jogo.obterCasa(linha - 1, coluna + 1);
		const casa_topo_esquerda = Jogo.obterCasa(linha - 1, coluna - 1);
		const casa_baixo_direita = Jogo.obterCasa(linha + 1, coluna + 1);
		const casa_baixo_esquerda = Jogo.obterCasa(linha + 1, coluna - 1);

		const casasAhmarcar = [
			casa_a_tras,
			casa_a_frente,
			casa_a_direita,
			casa_a_esquerda,
			casa_topo_direita,
			casa_topo_esquerda,
			casa_baixo_direita,
			casa_baixo_esquerda,
		];

		Jogo.marcarGrupo(casasAhmarcar);
		Jogo.prepararMovimento();
	}
}