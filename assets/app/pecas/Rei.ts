import { Jogo } from "../Jogo.js";
import { Peca } from "./Peca.js";

export class Rei extends Peca {
    constructor() {
        super();
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

    casasAhVolta(): Array<HTMLDivElement> {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        const casa_a_tras = Jogo.obterCasa(linha + 1, coluna);
        const casa_a_frente = Jogo.obterCasa(linha - 1, coluna);
        const casa_a_direita = Jogo.obterCasa(linha, coluna + 1);
        const casa_a_esquerda = Jogo.obterCasa(linha, coluna - 1);
        const casa_topo_direita = Jogo.obterCasa(linha - 1, coluna + 1);
        const casa_topo_esquerda = Jogo.obterCasa(linha - 1, coluna - 1);
        const casa_baixo_direita = Jogo.obterCasa(linha + 1, coluna + 1);
        const casa_baixo_esquerda = Jogo.obterCasa(linha + 1, coluna - 1);

        return [
            casa_a_tras,
            casa_a_frente,
            casa_a_direita,
            casa_a_esquerda,
            casa_topo_direita,
            casa_topo_esquerda,
            casa_baixo_direita,
            casa_baixo_esquerda,
        ].filter(
            (casa) =>
                (casa !== undefined && !Jogo.PossuiPeca(casa)) ||
                (Jogo.PossuiPeca(casa) &&
                    Jogo.corEhDiferente(casa.firstElementChild, this.elemento))
        );
    }

    mostrarDisponiveis() {
        Jogo.desmarcarTudo();
        this.elemento.setAttribute("data-marcador", "");
        const casasAhmarcar = this.casasAhVolta();
        Jogo.marcarGrupo(casasAhmarcar);
        Jogo.prepararMovimento();
    }
}
