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

    indisponiveisAoReiAdversario(): Array<HTMLDivElement> {
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
                    !Jogo.corEhDiferente(casa.firstElementChild, this.elemento))
        );
    }

    casasDisponiveis(casasAhvolta: any, casasIndisponiveis: Element[]) {
        function CasaEmIndispovivel(casa: Element, indisponiveis: Element[]): boolean {
            for (const insdisponivel of indisponiveis) {
                if (casa === insdisponivel) return true;
            }
            return false;
        }
        const casasAhMarcar = new Array();
        for (const casa of casasAhvolta) {
            if (!(CasaEmIndispovivel(casa, casasIndisponiveis))) casasAhMarcar.push(casa)
        }
        return casasAhMarcar
    }

    mostrarDisponiveis(indisponiveis: Element[] = []) {
        Jogo.desmarcarTudo();
        this.elemento.setAttribute("data-marcador", "");
        const casasAhvolta = this.casasAhVolta();
        const casasIndisponiveis = indisponiveis;
        const casasDisponiveis =  this.casasDisponiveis(casasAhvolta, casasIndisponiveis);
        Jogo.marcarGrupo(casasDisponiveis);
        Jogo.prepararMovimento();
    }
}
