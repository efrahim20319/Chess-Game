import { Peca } from "./Peca.js";
import { Jogo } from "../Jogo.js";
export class Bispo extends Peca {
    constructor() {
        super();
    }
    indisponiveisAoReiAdversario() {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        const casasAhmarcar = new Array().concat(this.marcacaoEspecial(this.casas_topo_direita(linha, coluna)), this.marcacaoEspecial(this.casas_topo_esquerda(linha, coluna)), this.marcacaoEspecial(this.casas_baixo_direita(linha, coluna)), this.marcacaoEspecial(this.casas_baixo_esquerda(linha, coluna)));
        return casasAhmarcar;
    }
    vitimas() {
        const [linha, coluna] = Jogo.obetrPosicao(this.elemento.parentElement);
        const inst = this;
        const vitimas = new Array()
            .concat(this.marcacoes(this.casas_topo_direita(linha, coluna)), this.marcacoes(this.casas_topo_esquerda(linha, coluna)), this.marcacoes(this.casas_baixo_direita(linha, coluna)), this.marcacoes(this.casas_baixo_esquerda(linha, coluna)))
            .filter((casa) => casa !== undefined &&
            Jogo.PossuiPeca(casa) &&
            Jogo.corEhDiferente(casa.childNodes[0], inst.elemento));
        return vitimas;
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
