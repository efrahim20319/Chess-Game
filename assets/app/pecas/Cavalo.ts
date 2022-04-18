import { Jogo } from "../Jogo.js";
import { Peca } from "./Peca.js";
export class Cavalo extends Peca {
    constructor() {
        super();
    }

    casasAhVolta() {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        const casa1 = Jogo.obterCasa(linha - 2, coluna - 1);
        const casa2 = Jogo.obterCasa(linha - 1, coluna - 2);
        const casa3 = Jogo.obterCasa(linha + 2, coluna - 1);
        const casa4 = Jogo.obterCasa(linha + 1, coluna - 2);
        const casa5 = Jogo.obterCasa(linha - 2, coluna + 1);
        const casa6 = Jogo.obterCasa(linha - 1, coluna + 2);
        const casa7 = Jogo.obterCasa(linha + 1, coluna + 2);
        const casa8 = Jogo.obterCasa(linha + 2, coluna + 1);

        return [casa1, casa2, casa3, casa4, casa5, casa6, casa7, casa8].filter(
            (casa) =>
                (casa !== undefined && !Jogo.PossuiPeca(casa)) ||
                (Jogo.PossuiPeca(casa) &&
                    Jogo.corEhDiferente(casa.firstElementChild, this.elemento))
        );
    }

    vitimas() {
        const inst = this;
        const vitimas = this.casasAhVolta().filter(
            (casa) =>
                casa !== undefined &&
                Jogo.PossuiPeca(casa) &&
                Jogo.corEhDiferente(casa.firstElementChild, inst.elemento)
        );
        return vitimas;
    }
    mostrarDisponiveis() {
        Jogo.desmarcarTudo();
        this.elemento.setAttribute("data-marcador", "");
        const casasAhMarcar = this.casasAhVolta();
        Jogo.marcarGrupo(casasAhMarcar);
        Jogo.prepararMovimento();
    }
}
