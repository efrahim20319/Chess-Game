import { Jogo } from "../Jogo.js";

export class Peca {
    public elemento: Element;
    constructor() {
        if (this.constructor == Peca) {
            throw new Error("Nao pode instanciar esse objeto");
        }
        this.elemento; //Estará assciado a uma posicao do array Jogo.casa
    }

    mostrarDisponiveis() {}

    casas_topo_direita(linha: number, coluna: number) {
        let casas = [];
        let iteracoes = 8 - coluna;
        for (linha--, coluna++; iteracoes > 0; linha--, coluna++, iteracoes--) {
            casas.push(Jogo.obterCasa(linha, coluna));
        }
        return casas;
    }

    casas_topo_esquerda(linha: number, coluna: number) {
        let casas = [];
        for (linha--, coluna--; coluna >= 0; linha--, coluna--) {
            casas.push(Jogo.obterCasa(linha, coluna));
        }
        return casas;
    }

    casas_baixo_direita(linha: number, coluna: number) {
        let casas = [];
        let iteracoes = 8 - coluna;
        for (linha++, coluna++; iteracoes > 0; linha++, coluna++, iteracoes--) {
            casas.push(Jogo.obterCasa(linha, coluna));
        }
        return casas;
    }

    casas_baixo_esquerda(linha: number, coluna: number) {
        let casas = [];
        for (linha++, coluna--; coluna >= 0; linha++, coluna--) {
            casas.push(Jogo.obterCasa(linha, coluna));
        }
        return casas;
    }

    casas_a_Frente(linha: number, coluna: number) {
        let casas = [];
        for (linha--; linha >= 0; linha--) {
            casas.push(Jogo.obterCasa(linha, coluna));
        }
        return casas;
    }

    casas_a_tras(linha: number, coluna: number) {
        let casas = [];
        for (linha++; linha < 8; linha++) {
            casas.push(Jogo.obterCasa(linha, coluna));
        }
        return casas;
    }

    casas_a_direita(linha: number, coluna: number) {
        let casas = [];
        for (coluna++; coluna < 8; coluna++) {
            casas.push(Jogo.obterCasa(linha, coluna));
        }
        return casas;
    }

    casas_a_esquerda(linha: number, coluna: number) {
        let casas = [];
        for (coluna--; coluna >= 0; coluna--) {
            casas.push(Jogo.obterCasa(linha, coluna));
        }
        return casas;
    }

    marcarEmSequencia(casas: Array<Element>, bloquearNoUltimo = false) {
        for (const casa of casas) {
            if (Jogo.casaEstaOcupada(casa)) {
                if (
                    Jogo.corEhDiferente(this.elemento, casa.firstElementChild)
                ) {
                    // Pode ser simplificado mas eu prefiro deixar assim
                    Jogo.marcar(casa, true);
                    if (!bloquearNoUltimo) return;
                }
                if (!bloquearNoUltimo) return;
            }
            Jogo.marcar(casa);
        }
    }
    marcacoes(casas: Array<HTMLDivElement>, bloquearNoUltimo = false) {
        const casasAhMarcar = [];
        for (const casa of casas) {
            if (Jogo.casaEstaOcupada(casa)) {
                if (
                    Jogo.corEhDiferente(this.elemento, casa.firstElementChild)
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
}