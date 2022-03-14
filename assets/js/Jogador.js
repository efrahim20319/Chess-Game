import { Peao } from "./pecas/Peao.js";
import { Cavalo } from "./pecas/Cavalo.js";
import { Torre } from "./pecas/Torre.js";
import { Bispo } from "./pecas/Bispo.js";
import { Rainha } from "./pecas/Rainha.js";
import { Rei } from "./pecas/Rei.js";

export class Jogador {
	constructor(nome, cor) {
		if (cor == "branco") this.vez = true;
		else this.vez = false;
		this.nome = nome;
		this.corDasPecas = cor;
		this.n_pecas = 16;
		this.peoes = new Array(8);
		this.cavalos = new Array(2);
		this.torres = new Array(2);
		this.bispos = new Array(2);
		this.rainha = new Array(); // É possivel ter mais de uma rainha no jogo, por isso é um array
		this.rei = new Array();
	}

	atualizar() {
		this.iniciarPeoes();
		this.iniciarCavalos();
		this.iniciarTorres();
		this.iniciarBispos();
		this.iniciarRainhas();
		this.iniciarRei();
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
			const inst_jogador = this;
			linha[i].addEventListener("click", function () {
				if (inst_jogador.vez) inst_peao.mostrarDisponiveis(this);
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
			const inst_jogador = this;
			cavalos[i].addEventListener("click", function () {
				if (inst_jogador.vez) inst_cavalo.mostrarDisponiveis(this);
			});
		}
	}

	iniciarTorres() {
		const torres = document.querySelectorAll(`.torre.${this.corDasPecas}`);
		for (let i = 0; i < torres.length; i++) {
			this.torres[i] = new Torre();
			this.torres[i].elemento = torres[i];
			const torre = this.torres[i];
			const inst_jogador = this;
			torres[i].addEventListener("click", function () {
				if (inst_jogador.vez) torre.mostrarDisponiveis(this);
			});
		}
	}

	iniciarBispos() {
		const bispos = document.querySelectorAll(`.bispo.${this.corDasPecas}`);
		for (let i = 0; i < bispos.length; i++) {
			this.bispos[i] = new Bispo();
			this.bispos[i].elemento = bispos[i];
			const bispo = this.bispos[i];
			const inst_jogador = this;
			bispos[i].addEventListener("click", function () {
				if (inst_jogador.vez) bispo.mostrarDisponiveis(this);
			});
		}
	}

	iniciarRainhas() {
		const rainhas = document.querySelectorAll(
			`.rainha.${this.corDasPecas}`
		);
		for (let i = 0; i < rainhas.length; i++) {
			this.rainha[i] = new Rainha();
			this.rainha[i].elemento = rainhas[i];
			const rainha = this.rainha[i];
			const inst_jogador = this;
			rainhas[i].addEventListener("click", function () {
				if (inst_jogador.vez) rainha.mostrarDisponiveis(this);
			});
		}
	}

	iniciarRei() {
		//Refatorar isso, esta muito mal feito, mas deixo porque esta a funcionar
		const reis = document.querySelectorAll(`.rei.${this.corDasPecas}`);
		for (let i = 0; i < reis.length; i++) {
			this.rei[i] = new Rei();
			this.rei[i].elemento = reis[i];
			const rei = this.rei[i];
			const inst_jogador = this;
			reis[i].addEventListener("click", function () {
				if (inst_jogador.vez) rei.mostrarDisponiveis();
			});
		}
	}
}
