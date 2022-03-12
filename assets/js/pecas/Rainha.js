import { Jogo } from "../Jogo.js";
import { Peca } from "./Peca.js";

export class Rainha extends Peca {
	constructor() {
		super()
	}

	mostrarDisponiveis() {
		Jogo.desmarcarTudo();
		this.elemento.setAttribute("data-marcador", "");
		const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentNode);
		const casas_a_tras = this.casas_a_tras(linha, coluna);
		const casas_a_frente = this.casas_a_Frente(linha, coluna);
		const casas_a_direita = this.casas_a_direita(linha, coluna);
		const casas_a_esquerda = this.casas_a_esquerda(linha, coluna);
		const casas_topo_direita = this.casas_topo_direita(linha, coluna);
		const casas_topo_esquerda = this.casas_topo_esquerda(linha, coluna);
		const casas_baixo_direita = this.casas_baixo_direita(linha, coluna);
		const casas_baixo_esquerda = this.casas_baixo_esquerda(linha, coluna);

		this.marcarEmSequencia(casas_a_tras);
		this.marcarEmSequencia(casas_a_frente);
		this.marcarEmSequencia(casas_a_direita);
		this.marcarEmSequencia(casas_a_esquerda);
		this.marcarEmSequencia(casas_topo_direita);
		this.marcarEmSequencia(casas_topo_esquerda);
		this.marcarEmSequencia(casas_baixo_direita);
		this.marcarEmSequencia(casas_baixo_esquerda);
        Jogo.prepararMovimento()
	}
}