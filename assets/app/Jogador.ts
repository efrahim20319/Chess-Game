import { Peao } from "./pecas/Peao.js";
import { Cavalo } from "./pecas/Cavalo.js";
import { Torre } from "./pecas/Torre.js";
import { Bispo } from "./pecas/Bispo.js";
import { Rainha } from "./pecas/Rainha.js";
import { Rei } from "./pecas/Rei.js";

export class Jogador {
    public vez: boolean;
    public nome: string;
    public corDasPecas: string;
    public numeroDePecas: number;
    public peoes: Array<Peao>;
    public cavalos: Array<Cavalo>;
    public torres: Array<Torre>;
    public bispos: Array<Bispo>;
    public rainhas: Array<Rainha>;
    public rei: Array<Rei>;
    constructor(nome: string, cor: string) {
        if (cor == "branco") this.vez = true;
        else this.vez = false;
        this.nome = nome;
        this.corDasPecas = cor;
        this.numeroDePecas = 16;
        this.peoes = new Array();
        this.cavalos = new Array();
        this.torres = new Array();
        this.bispos = new Array();
        this.rainhas = new Array(); // É possivel ter mais de uma rainha no jogo, por isso é um array
        this.rei = new Array();
    }

    calcularNumeroDePecas() {
        const n_peoes = this.peoes.length;
        const n_cavalos = this.cavalos.length;
        const n_torres = this.torres.length;
        const n_bispos = this.bispos.length;
        const n_rainhas = this.rainhas.length;
        const rei = this.rei.length;
        const soma =
            n_peoes + n_cavalos + n_torres + n_bispos + n_rainhas + rei;
        this.numeroDePecas = soma;
    }

    atualizar() {
        this.peoes = new Array();
        this.cavalos = new Array();
        this.torres = new Array();
        this.bispos = new Array();
        this.rainhas = new Array();
        this.iniciarPeoes();
        this.iniciarCavalos();
        this.iniciarTorres();
        this.iniciarBispos();
        this.iniciarRainhas();
        this.iniciarRei();
        this.calcularNumeroDePecas();
    }

    iniciarPeoes() {
        const linha = document.querySelectorAll(`.peao.${this.corDasPecas}`);
        let primeira_play;
        for (let i = 0; i < linha.length; i++) {
            primeira_play = linha[i].getAttribute("data-primeira_play");
            this.peoes[i] = new Peao();
            if (primeira_play == undefined) {
                linha[i].setAttribute("data-primeira_play", "true");
            }
            this.peoes[i].elemento = linha[i];
            const inst_peao = this.peoes[i];
            const inst_jogador = this;
            linha[i].addEventListener("click", function () {
                if (inst_jogador.vez) inst_peao.mostrarDisponiveis();
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
                if (inst_jogador.vez) inst_cavalo.mostrarDisponiveis();
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
                if (inst_jogador.vez) torre.mostrarDisponiveis();
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
                if (inst_jogador.vez) bispo.mostrarDisponiveis();
            });
        }
    }

    iniciarRainhas() {
        const rainhas = document.querySelectorAll(
            `.rainha.${this.corDasPecas}`
        );
        for (let i = 0; i < rainhas.length; i++) {
            this.rainhas[i] = new Rainha();
            this.rainhas[i].elemento = rainhas[i];
            const rainha = this.rainhas[i];
            const inst_jogador = this;
            rainhas[i].addEventListener("click", function () {
                if (inst_jogador.vez) rainha.mostrarDisponiveis();
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

    vitimas(): Array<Element> {
        const vitimas = Array();
        this.peoes.forEach((peao) => vitimas.push(...peao.vitimas()));
        this.torres.forEach((torre) => vitimas.push(...torre.vitimas()));
        this.bispos.forEach((bispo) => vitimas.push(...bispo.vitimas()));
        this.cavalos.forEach((cavalo) => vitimas.push(...cavalo.vitimas()));
        this.rainhas.forEach((rainha) => vitimas.push(...rainha.vitimas()));
        this.rei.forEach((rei) => vitimas.push(...rei.vitimas()));

        return vitimas;
    }
}
