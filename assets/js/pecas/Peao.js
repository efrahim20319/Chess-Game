import { Peca } from "./Peca.js"
import { Jogo } from "../Jogo.js"
export class Peao extends Peca {
    constructor() {
        super()
        this.primeira_jogada = true
    }

    // pretoPodeMatar(linha, coluna, marcador) {
    //     const [casa1, casa2] = [Jogo.obterCasa(linha + 1, coluna - 1), Jogo.obterCasa(linha + 1, coluna + 1)]
    //     if (Jogo.casaEstaOcupada(casa1)) {
    //         const casa = Jogo.obterCasa(linha + 1, coluna - 1)
    //         if (Jogo.corEhDiferente(marcador, casa.childNodes[0]))
    //             Jogo.marcar(casa, true)
    //     }
    //     if (Jogo.casaEstaOcupada(casa2)) {
    //         const casa = Jogo.obterCasa(linha + 1, coluna + 1)
    //         if (Jogo.corEhDiferente(marcador, casa.childNodes[0]))
    //             Jogo.marcar(casa, true)
    //     }
    // }
    // brancoPodeMatar(linha, coluna, marcador) {
    //     const [casa1, casa2] = [Jogo.obterCasa(linha - 1, coluna - 1), Jogo.obterCasa(linha - 1, coluna + 1)]
    //     if (Jogo.casaEstaOcupada(casa1)) {
    //         const casa = Jogo.obterCasa(linha - 1, coluna - 1)
    //         if (Jogo.corEhDiferente(marcador, casa.childNodes[0]))
    //             Jogo.marcar(casa, true)
    //     }
    //     if (Jogo.casaEstaOcupada(casa2)) {
    //         const casa = Jogo.obterCasa(linha - 1, coluna + 1)
    //         if (Jogo.corEhDiferente(marcador, casa.childNodes[0]))
    //             Jogo.marcar(casa, true)
    //     }
    // }


    mostrarDisponiveis(peao) {
        Jogo.desmarcarTudo()
        let pos = Jogo.obetrPosicao(peao.parentNode)
        peao.setAttribute("data-marcador", "")
        const [linha, coluna] = pos
        try {
            if (peao.classList.contains("preto")) {
                const casa1 = Jogo.obterCasa(linha + 1, coluna)
                const casa2 = Jogo.obterCasa(linha + 2, coluna)
                const casasAhMarcar = [casa1, casa2]
                if (peao.dataset.primeira_play == "true") {
                    Jogo.marcarEmSequencia(casasAhMarcar)
                    Jogo.prepararMovimento()
                } else {
                    Jogo.marcar(casa1)
                    Jogo.prepararMovimento()
                }

            } else {
                const casa1 = Jogo.obterCasa(linha - 1, coluna)
                const casa2 = Jogo.obterCasa(linha - 2, coluna)
                const casasAhMarcar = [casa1, casa2]
                if (peao.dataset.primeira_play == "true") {
                    Jogo.marcarEmSequencia(casasAhMarcar)
                    Jogo.prepararMovimento()
                } else {
                    Jogo.marcar(casa1)
                    Jogo.prepararMovimento()
                }
            }
        } catch (TypeError) {
            return
        }



    }


}