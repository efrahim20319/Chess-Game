import { Jogo } from "../Jogo.js";
import { Peca } from "./Peca.js";
export class Cavalo extends Peca {
	constructor() {
		super();
	}

	casasAhVolta(linha, coluna) {
		const casa1 = Jogo.obterCasa(linha - 2, coluna - 1);
		const casa2 = Jogo.obterCasa(linha - 1, coluna - 2);
		const casa3 = Jogo.obterCasa(linha + 2, coluna - 1);
		const casa4 = Jogo.obterCasa(linha + 1, coluna - 2);
		const casa5 = Jogo.obterCasa(linha - 2, coluna + 1);
		const casa6 = Jogo.obterCasa(linha - 1, coluna + 2);
		const casa7 = Jogo.obterCasa(linha + 1, coluna + 2);
		const casa8 = Jogo.obterCasa(linha + 2, coluna + 1);

		return [casa1, casa2, casa3, casa4, casa5, casa6, casa7, casa8];
	}

	killers() {
		const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentNode);
		const inst = this;
		const killers = this.casasAhVolta(linha, coluna).filter(
			(casa) =>
				casa !== undefined &&
				Jogo.PossuiPeca(casa) &&
				Jogo.corEhDiferente(casa.childNodes[0], inst.elemento)
		);
		console.log(killers);
	}
	mostrarDisponiveis(cavalo) {
		Jogo.desmarcarTudo();
		cavalo.setAttribute("data-marcador", "");
		const [linha, coluna] = Jogo.obetrPosicao(cavalo.parentNode);
		const casasAhMarcar = this.casasAhVolta(linha, coluna);
		this.killers();
		Jogo.marcarGrupo(casasAhMarcar);
		Jogo.prepararMovimento();
	}
}
