import { Peao } from "./pecas/Peao.js";
import { Cavalo } from "./pecas/Cavalo.js";
import { Torre } from "./pecas/Torre.js";

export class Jogador {
	constructor(nome, cor) {
		this.nome = nome;
		this.corDasPecas = cor;
		this.n_pecas = 16;
		this.peoes = new Array(8);
		this.cavalos = new Array(2);
		this.torres = new Array(2);
	}

	atualizar() {
		this.iniciarPeoes();
		this.iniciarCavalos();
		this.iniciarTorres();
	}

	iniciarPeoes() {
		const linha = document.querySelectorAll(`.peao.${this.corDasPecas}`);
		for (let i = 0; i < linha.length; i++) {
			this.peoes[i] = new Peao();
			if (linha[i].dataset.primeira_play == undefined) {
				linha[i].dataset.primeira_play = true;
			}
			this.peoes[i].elemento = linha[i];
			const inst_peao = this.peoes[i];
			linha[i].addEventListener("click", function () {
				inst_peao.mostrarDisponiveis(this);
			});
		}
	}

	iniciarCavalos() {
		const cavalos = document.querySelectorAll(
			`.cavalo.${this.corDasPecas}`
		);
		for (let i = 0; i < cavalos.length; i++) {
			this.cavalos[i] = new Cavalo();
			this.cavalos[i].elemento = cavalos[i];
			const inst_cavalo = this.cavalos[i];
			cavalos[i].addEventListener("click", function () {
				console.log(this);
				inst_cavalo.mostrarDisponiveis(this);
			});
		}
	}
    
	iniciarTorres() {
		const torres = document.querySelectorAll(`.torre.${this.corDasPecas}`);
		for (let i = 0; i < torres.length; i++) {
			this.torres[i] = new Torre();
			this.torres[i].elemento = torres[i];
			const torre = this.torres[i];
			torres[i].addEventListener("click", function () {
				torre.mostrarDisponiveis(this);
			});
		}
	}
}
