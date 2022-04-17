import { Peca } from "./Peca.js";
import { Jogo } from "../Jogo.js";

function marcacoes(casas: Array<HTMLDivElement>, elemento: Element, bloquearNoUltimo = false): Array<HTMLDivElement> {
    const casasAhMarcar = [];
    for (const casa of casas) {
        if (Jogo.PossuiPeca(casa)) {
            if (
                Jogo.corEhDiferente(elemento, casa.firstElementChild)
            ) {
                // Pode ser simplificado mas eu prefiro deixar assim
                casasAhMarcar.push(casa);
                if (!bloquearNoUltimo) break;
            }
            if (!bloquearNoUltimo) break;
        }
        casasAhMarcar.push(casa);
    }
    
    return casasAhMarcar;
}
export class Bispo extends Peca {
    constructor() {
        super();
    }

    killers(): Array<Element> {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        const inst = this;
        const killers = new Array()
            .concat(
                marcacoes(this.casas_topo_direita(linha, coluna).filter(casa => casa !== undefined), this.elemento),
                marcacoes(this.casas_topo_esquerda(linha, coluna).filter(casa => casa !== undefined), this.elemento),
                marcacoes(this.casas_baixo_direita(linha, coluna).filter(casa => casa !== undefined), this.elemento),
                marcacoes(this.casas_baixo_esquerda(linha, coluna).filter(casa => casa !== undefined), this.elemento)
            )
            .filter(
                (casa) =>
                    casa !== undefined &&
                    Jogo.PossuiPeca(casa) &&
                    Jogo.corEhDiferente(casa.childNodes[0], inst.elemento)
            );
        return killers;
    }

    mostrarDisponiveis() {
        Jogo.desmarcarTudo();
        this.elemento.setAttribute("data-marcador", "");
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        const casas_topo_direita = this.casas_topo_direita(linha, coluna);
        const casas_topo_esquerda = this.casas_topo_esquerda(linha, coluna);
        const casas_baixo_direita = this.casas_baixo_direita(linha, coluna);
        const casas_baixo_esquerda = this.casas_baixo_esquerda(linha, coluna);
        this.marcarEmSequencia(casas_topo_direita);
        this.marcarEmSequencia(casas_topo_esquerda);
        this.marcarEmSequencia(casas_baixo_direita);
        this.marcarEmSequencia(casas_baixo_esquerda);

        Jogo.prepararMovimento();
    }
}
