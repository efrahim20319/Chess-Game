import { Jogador } from "./Jogador.js";

export class Jogo {
	static init(jogador1, jogador2) {
		Jogo.casas = Jogo.obterMatrix();
		Jogo._jogador2 = jogador1
		Jogo._jogador1 = jogador2
	}

	set jogador1(jogador) {
		Jogo._jogador1 = jogador;
	}

	get jogador1() {
		return Jogo._jogador1;
	}

	set jogador2(jogador) {
		Jogo._jogador2 = jogador;
	}

	get jogador2() {
		return Jogo._jogador2;
	}

	static obetrPosicao(elemento) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (Jogo.casas[i][j] == elemento) return [i, j];
			}
		}
	}

	static obterMatrix() {
		let casas = document.querySelectorAll(".casa");
		let casasMatrix = new Array(8);
		for (let i = 0; i < 8; i++) {
			casasMatrix[i] = new Array(8);
		}
		for (let i = 0, h = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++, h++) {
				casasMatrix[i][j] = casas[h];
			}
		}
		return casasMatrix;
	}

	static pintarTabuleiro() {
		let alter = false;
		Jogo.casas.forEach((v, i, a) => {
			v.forEach((v, i, a) => {
				if (alter) {
					v.classList.add("casaPreta");
				}
				alter = !alter
			});
			alter = !alter
		});
	}

	static obterCasa(linha, coluna) {
		try {
			return Jogo.casas[linha][coluna];
		} catch (TypeError) {
			return undefined;
		}
	}

	static corDaPeca(peca) {
		if (peca.classList.contains("preto")) return "preto";
		return "branco";
	}

	static corEhDiferente(peca1, peca2) {
		const corPeca1 = Jogo.corDaPeca(peca1);
		const corPeca2 = Jogo.corDaPeca(peca2);
		return corPeca1 != corPeca2;
	}

	static criarPeca(nome) {
		let peca = document.createElement("span");
		peca.classList.add("peca", nome);
		return peca;
	}

	static casaEstaOcupada(casa) {
		try {
			const peca = casa.childNodes[0];
			const marcador = document.querySelector("[data-marcador]");
			if (peca) {
				const corDaPeca = Jogo.corDaPeca(peca);
				const corDoMarcador = Jogo.corDaPeca(marcador);
				if (
					corDaPeca != corDoMarcador &&
					!marcador.classList.contains("peao") &&
					!marcador.classList.contains("torre") &&
					!marcador.classList.contains("bispo") &&
					!marcador.classList.contains("rainha")
				)
					return false;
			}

			if (casa.childNodes.length) return true;
			return false;
		} catch (TypeError) {
			console.log("ocupado:", casa);
		}
	}

	static PossuiPeca(casa) {
		if (casa.childNodes.length) return true;
		return false;
	}

	static marcar(casa, forceOption = false) {
		try {
			if (Jogo.casaEstaOcupada(casa) && !forceOption) {
				console.log("Esta ocupado");
				return;
			}
			casa.classList.add("marcado");
		} catch (TypeError) {
			console.log("Erro ao marcar");
		}
	}

	static marcarEmSequencia(casas) {
		for (let i = 0; i < casas.length; i++) {
			const casa = casas[i];
			if (Jogo.casaEstaOcupada(casa)) return;
			Jogo.marcar(casa);
		}
	}

	static marcarGrupo(casas) {
		for (const casa of casas) {
			Jogo.marcar(casa);
		}
	}

	static removerEventos(elemento, ClasseRemovida = "") {
		elemento.classList.remove(ClasseRemovida);
		let aux = elemento.outerHTML;
		elemento.outerHTML = aux;
	}

	static desmarcarTudo() {
		let marcador = document.querySelector("[data-marcador]");
		if (marcador) marcador.removeAttribute("data-marcador");
		Jogo.casas.forEach((linha) => {
			for (let casa of linha) {
				if (casa.classList.contains("marcado")) {
					Jogo.removerEventos(casa, "marcado");
				}
			}
		});
		Jogo.casas = Jogo.obterMatrix();
	}

	static motarPecas(pos1, pos2, cor = "branco") {
		let ordem = [
			"torre",
			"cavalo",
			"bispo",
			"rainha",
			"rei",
			"bispo",
			"cavalo",
			"torre",
		];
		let linha_1 = Jogo.casas[pos1];
		let linha_2 = Jogo.casas[pos2];
		for (let i = 0; i < linha_1.length; i++) {
			let peao = Jogo.criarPeca("peao");
			let item_linha1 = Jogo.criarPeca(ordem[i]);
			item_linha1.classList.add(cor);
			peao.classList.add(cor);
			linha_1[i].appendChild(item_linha1);
			linha_2[i].appendChild(peao);
		}
	}

	static prepararMovimento() {
		const marcador = document.querySelector("[data-marcador]");
		const marcados = document.querySelectorAll(".marcado");

		marcados.forEach((marcado) => {
			marcado.addEventListener("click", () => {
				Jogo.mover(marcador, marcado);
			});
		});
	}

	static trocarVez() {
		Jogo._jogador1.vez = !Jogo._jogador1.vez
		Jogo._jogador2.vez = !Jogo._jogador2.vez
	}

	static mover(marcador, marcado) {
		if (
			marcador.classList.contains("peao") &&
			marcador.dataset.primeira_play
		) {
			marcador.dataset.primeira_play = false;
		}
		if (Jogo.casaEstaOcupada(marcado)) {
			Jogo.comer(marcado)
		}
		marcado.appendChild(marcador);
		Jogo.desmarcarTudo();
		Jogo.trocarVez()
		Jogo._jogador1.atualizar();
		Jogo._jogador2.atualizar();
	}

	static comer(marcado) {
		marcado.innerHTML = ""
	}
}