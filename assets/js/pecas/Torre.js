import { Peca } from "./Peca.js";
import { Jogo } from "../Jogo.js";

export class Torre extends Peca {
	constructor() {
		super();
	}

	killers() {
		const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentNode);
		const inst = this;
		const killers = new Array()
			.concat(
				this.marcacoes(this.casas_a_Frente(linha, coluna)),
				this.marcacoes(this.casas_a_tras(linha, coluna)),
				this.marcacoes(this.casas_a_direita(linha, coluna)),
				this.marcacoes(this.casas_a_esquerda(linha, coluna))
			)
			.filter(
				(casa) =>
					casa !== undefined &&
					Jogo.PossuiPeca(casa) &&
					Jogo.corEhDiferente(casa.childNodes[0], inst.elemento)
			);
		return killers;
	}

	mostrarDisponiveis(torre) {
		this.elemento = torre;
		Jogo.desmarcarTudo();
		torre.setAttribute("data-marcador", "");
		const [linha, coluna] = Jogo.obetrPosicao(torre.parentNode);
		const casas_a_Frente = this.casas_a_Frente(linha, coluna);
		const casas_a_tras = this.casas_a_tras(linha, coluna);
		const casas_a_direita = this.casas_a_direita(linha, coluna);
		const casas_a_esquerda = this.casas_a_esquerda(linha, coluna);
		this.marcarEmSequencia(casas_a_Frente);
		this.marcarEmSequencia(casas_a_tras);
		this.marcarEmSequencia(casas_a_direita);
		this.marcarEmSequencia(casas_a_esquerda);

		Jogo.prepararMovimento();
	}
}
