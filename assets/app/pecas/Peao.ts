import { Peca } from "./Peca.js";
import { Jogo } from "../Jogo.js";
export class Peao extends Peca {
    primeira_jogada: boolean;
    constructor() {
        super();
        this.primeira_jogada = true;
    }

    indisponiveisAoReiAdversario(): Array<Element> {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        let sinal = "";
        Jogo.corDaPeca(this.elemento) == "branco"
            ? (sinal = "-")
            : (sinal = "+");
        const casa1 = Jogo.obterCasa(eval(`${linha} ${sinal} 1`), coluna - 1);
        const casa2 = Jogo.obterCasa(eval(`${linha} ${sinal} 1`), coluna + 1);
        const casasAhMarcar = new Array();
        if (!Jogo.PossuiPeca(casa1) && casa1 || Jogo.PossuiPeca(casa1) && !Jogo.corEhDiferente(casa1.firstElementChild, this.elemento)) {
            casasAhMarcar.push(casa1)
        }

        if (!Jogo.PossuiPeca(casa2) && casa2 || Jogo.PossuiPeca(casa2) && !Jogo.corEhDiferente(casa2.firstElementChild, this.elemento)) {
            casasAhMarcar.push(casa2)
        }
        return casasAhMarcar;
    }

    casasNaDiagonal(): Array<Element> {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
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

    casasAhFrente(): Array<Element> {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
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

    vitimas(): Array<Element> {
        const vitimas = this.casasNaDiagonal();
        return vitimas;
    }

    mostrarDisponiveis() {
        Jogo.desmarcarTudo();
        this.elemento.setAttribute("data-marcador", "");
        try {
            const casasAhFrente = this.casasAhFrente();
            const casasNaDiagonal = this.casasNaDiagonal();
            Jogo.marcarGrupo(casasNaDiagonal, true);
            Jogo.marcarEmSequencia(casasAhFrente);
            Jogo.prepararMovimento();
        } catch (TypeError) {
            return;
        }
    }
}
