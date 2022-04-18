import { Peca } from "./Peca.js";
import { Jogo } from "../Jogo.js";
export class Peao extends Peca {
    primeira_jogada: boolean;
    constructor() {
        super();
        this.primeira_jogada = true;
    }

    casasNaDiagonal(linha: number, coluna: number): Array<Element> {
        let sinal = "";
        Jogo.corDaPeca(this.elemento) == "branco"
            ? (sinal = "-")
            : (sinal = "+");
        const casa1 = Jogo.obterCasa(eval(`${linha} ${sinal} 1`), coluna - 1);
        const casa2 = Jogo.obterCasa(eval(`${linha} ${sinal} 1`), coluna + 1);
        const casasAhMarcar = new Array();
        if (Jogo.PossuiPeca(casa1)) {
            if (Jogo.corEhDiferente(this.elemento, casa1.firstElementChild))
                casasAhMarcar.push(casa1);
        }
        if (Jogo.PossuiPeca(casa2)) {
            if (Jogo.corEhDiferente(this.elemento, casa2.firstElementChild))
                casasAhMarcar.push(casa2);
        }
        return casasAhMarcar;
    }

    casasAhFrente(linha: number, coluna: number): Array<Element> {
        let sinal = "";
        let primeira_play;
        Jogo.corDaPeca(this.elemento) == "branco"
            ? (sinal = "-")
            : (sinal = "+");
        const casa1 = Jogo.obterCasa(eval(`${linha} ${sinal} 1`), coluna);
        const casa2 = Jogo.obterCasa(eval(`${linha} ${sinal} 2`), coluna);
        const casasAhMarcar = [casa1, casa2];
        primeira_play = this.elemento.getAttribute("data-primeira_play");
        if (primeira_play == "true") return casasAhMarcar;
        return [casasAhMarcar[0]];
    }

    killers(): Array<Element> {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        const killers = this.casasNaDiagonal(linha, coluna);
        return killers;
    }

    mostrarDisponiveis() {
        Jogo.desmarcarTudo();
        let pos = Jogo.obetrPosicao(this.elemento.parentElement);
        this.elemento.setAttribute("data-marcador", "");
        const [linha, coluna] = pos;
        try {
            const casasAhFrente = this.casasAhFrente(linha, coluna);
            const casasNaDiagonal = this.casasNaDiagonal(linha, coluna);
            Jogo.marcarGrupo(casasNaDiagonal, true);
            Jogo.marcarEmSequencia(casasAhFrente);
            Jogo.prepararMovimento();
        } catch (TypeError) {
            return;
        }
    }
}
