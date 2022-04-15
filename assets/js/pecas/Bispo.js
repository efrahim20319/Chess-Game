import { Peca } from "./Peca.js";
import { Jogo } from "../Jogo.js";
export class Bispo extends Peca {
    constructor() {
        super();
    }
    killers() {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        const inst = this;
        const killers = new Array()
            .concat(this.marcacoes(this.casas_topo_direita(linha, coluna)), this.marcacoes(this.casas_topo_esquerda(linha, coluna)), this.marcacoes(this.casas_baixo_direita(linha, coluna)), this.marcacoes(this.casas_baixo_esquerda(linha, coluna)))
            .filter((casa) => casa !== undefined &&
            Jogo.PossuiPeca(casa) &&
            Jogo.corEhDiferente(casa.childNodes[0], inst.elemento));
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
        console.log(this.killers());
        this.marcarEmSequencia(casas_topo_direita);
        this.marcarEmSequencia(casas_topo_esquerda);
        this.marcarEmSequencia(casas_baixo_direita);
        this.marcarEmSequencia(casas_baixo_esquerda);
        Jogo.prepararMovimento();
    }
}
