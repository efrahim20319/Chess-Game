import { Peca } from "./Peca.js";
import { Jogo } from "../Jogo.js";
function marcacoes(casas, elemento, bloquearNoUltimo = false) {
    const casasAhMarcar = [];
    for (const casa of casas) {
        if (Jogo.PossuiPeca(casa)) {
            if (Jogo.corEhDiferente(elemento, casa.firstElementChild)) {
                // Pode ser simplificado mas eu prefiro deixar assim
                casasAhMarcar.push(casa);
                if (!bloquearNoUltimo)
                    break;
            }
            if (!bloquearNoUltimo)
                break;
        }
        casasAhMarcar.push(casa);
    }
    return casasAhMarcar;
}
export class Torre extends Peca {
    constructor() {
        super();
    }
    killers() {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        const inst = this;
        const killers = new Array()
            .concat(marcacoes(this.casas_a_Frente(linha, coluna).filter(casa => casa !== undefined), this.elemento), marcacoes(this.casas_a_tras(linha, coluna).filter(casa => casa !== undefined), this.elemento), marcacoes(this.casas_a_direita(linha, coluna).filter(casa => casa !== undefined), this.elemento), marcacoes(this.casas_a_esquerda(linha, coluna).filter(casa => casa !== undefined), this.elemento))
            .filter((casa) => casa !== undefined &&
            Jogo.PossuiPeca(casa) &&
            Jogo.corEhDiferente(casa.childNodes[0], inst.elemento));
        return killers;
    }
    mostrarDisponiveis() {
        Jogo.desmarcarTudo();
        this.elemento.setAttribute("data-marcador", "");
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        const casas_a_Frente = this.casas_a_Frente(linha, coluna);
        const casas_a_tras = this.casas_a_tras(linha, coluna);
        const casas_a_direita = this.casas_a_direita(linha, coluna);
        const casas_a_esquerda = this.casas_a_esquerda(linha, coluna);
        this.marcarEmSequencia(casas_a_Frente);
        this.marcarEmSequencia(casas_a_tras);
        this.marcarEmSequencia(casas_a_direita);
        this.marcarEmSequencia(casas_a_esquerda);
        Jogo.prepararMovimento();
    }
}
