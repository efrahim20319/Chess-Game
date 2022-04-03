import { Peca } from "./Peca.js";
import { Jogo } from "../Jogo.js";
export class Peao extends Peca {
	constructor() {
		super();
		this.primeira_jogada = true;
	}

	casasNaDiagonal(linha, coluna) {
		let sinal = "";
		Jogo.corDaPeca(this.elemento) == "branco"
			? (sinal = "-")
			: (sinal = "+");
		const casa1 = Jogo.obterCasa(eval(`${linha} ${sinal} 1`), coluna - 1);
		const casa2 = Jogo.obterCasa(eval(`${linha} ${sinal} 1`), coluna + 1);
		const casasAhMarcar = new Array();
		if (Jogo.casaEstaOcupada(casa1)) {
			if (Jogo.corEhDiferente(this.elemento, casa1.childNodes[0]))
				casasAhMarcar.push(casa1);
		}
		if (Jogo.casaEstaOcupada(casa2)) {
			if (Jogo.corEhDiferente(this.elemento, casa2.childNodes[0]))
				casasAhMarcar.push(casa2);
		}
		return casasAhMarcar;
	}

	casasAhFrente(linha, coluna) {
		let sinal = "";
		Jogo.corDaPeca(this.elemento) == "branco"
			? (sinal = "-")
			: (sinal = "+");
		const casa1 = Jogo.obterCasa(eval(`${linha} ${sinal} 1`), coluna);
		const casa2 = Jogo.obterCasa(eval(`${linha} ${sinal} 2`), coluna);
		const casasAhMarcar = [casa1, casa2];
		if (this.elemento.dataset.primeira_play == "true") return casasAhMarcar;
		return [casasAhMarcar[0]];
	}

	mostrarDisponiveis(peao) {
		Jogo.desmarcarTudo();
		let pos = Jogo.obetrPosicao(peao.parentNode);
		peao.setAttribute("data-marcador", "");
		const [linha, coluna] = pos;
		try {
			if (peao.classList.contains("preto")) {
				const casasAhFrente = this.casasAhFrente(linha, coluna);
				const casasNaDiagonal = this.casasNaDiagonal(linha, coluna);
				this.marcarEmSequencia(casasNaDiagonal, true);
				Jogo.marcarEmSequencia(casasAhFrente);
				Jogo.prepararMovimento();
			} else {
				const casasAhFrente = this.casasAhFrente(linha, coluna);
				const casasNaDiagonal = this.casasNaDiagonal(linha, coluna);
				this.marcarEmSequencia(casasNaDiagonal, true);
				Jogo.marcarEmSequencia(casasAhFrente);
				Jogo.prepararMovimento();
			}
		} catch (TypeError) {
			return;
		}
	}
}
