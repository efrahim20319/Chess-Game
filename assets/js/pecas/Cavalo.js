import { Jogo } from "../Jogo.js"
import { Peca } from "./Peca.js"
export class Cavalo extends Peca {
    constructor() {
        super()
    }

    mostrarDisponiveis(cavalo) {
        Jogo.desmarcarTudo()
        const pos = Jogo.obetrPosicao(cavalo.parentNode)
        cavalo.setAttribute("data-marcador", "")
        const [linha, coluna] = pos
        let casasAhMarcar = []

        const casa1 = Jogo.obterCasa(linha - 2, coluna - 1)
        const casa2 = Jogo.obterCasa(linha - 1, coluna - 2)
        const casa3 = Jogo.obterCasa(linha + 2, coluna - 1)
        const casa4 = Jogo.obterCasa(linha + 1, coluna - 2)
        const casa5 = Jogo.obterCasa(linha - 2, coluna + 1)
        const casa6 = Jogo.obterCasa(linha - 1, coluna + 2)
        const casa7 = Jogo.obterCasa(linha + 1, coluna + 2)
        const casa8 = Jogo.obterCasa(linha + 2, coluna + 1)

        casasAhMarcar = [casa1, casa2, casa3, casa4, casa5, casa6, casa7, casa8]

        Jogo.marcarGrupo(casasAhMarcar)
        Jogo.prepararMovimento()

    }
}