class Cavalo extends Peca {
    constructor () {
        super()
    }

    mostrarDisponiveis(cavalo) {
        let pos = jogo.obetrPosicao(cavalo.parentNode)
        cavalo.setAttribute("data-marcador", "")
        const [linha, coluna] = pos
        let casasAhMarcar = []
        
        let casa1 = jogo.obterCasa(linha - 2, coluna - 1)
        let casa2 = jogo.obterCasa(linha - 1, coluna - 2)
        let casa3 = jogo.obterCasa(linha + 2, coluna - 1)
        let casa4 = jogo.obterCasa(linha + 1, coluna - 2)
        let casa5 = jogo.obterCasa(linha - 2, coluna + 1)
        let casa6 = jogo.obterCasa(linha - 1, coluna + 2)
        let casa7 = jogo.obterCasa(linha + 1, coluna + 2)
        let casa8 = jogo.obterCasa(linha + 2, coluna + 1)
        
        casasAhMarcar = [casa1, casa2, casa3, casa4, casa5, casa6, casa7, casa8]

        jogo.marcarGrupo(casasAhMarcar)
        jogo.prepararMovimento()



    }
}