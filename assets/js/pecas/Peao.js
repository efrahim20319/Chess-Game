class Peao extends Peca {
    constructor() {
        super()
        this.primeira_jogada = true
    }

    verificarSePodeMatar() {

    }

    mostrarDisponiveis(peao) {
        let pos = jogo.obetrPosicao(peao.parentNode)
        peao.setAttribute("data-marcador", "")
        const [linha, coluna] = pos
        try {
            if (peao.classList.contains("preto")) {
                let casa1 = jogo.obterCasa(linha + 1, coluna)
                let casa2 = jogo.obterCasa(linha + 2, coluna)
                let casasAhMarcar = [casa1, casa2]
                if (jogo.casaEstaOcupada(jogo.obterCasa(linha + 1, coluna - 1))) {
                    let casa = jogo.obterCasa(linha + 1, coluna - 1)
                    jogo.marcar(casa, true)
                }
                if (peao.dataset.primeira_play == "true") {
                    jogo.marcarEmSequencia(casasAhMarcar)
                    jogo.prepararMovimento()
                } else {
                    jogo.marcar(casa1)
                    jogo.prepararMovimento()
                }

            } else {
                let casa1 = jogo.obterCasa(linha - 1, coluna)
                let casa2 = jogo.obterCasa(linha - 2, coluna)
                let casasAhMarcar = [casa1, casa2]
                if (peao.dataset.primeira_play == "true") {
                    jogo.marcarEmSequencia(casasAhMarcar)
                    jogo.prepararMovimento()
                } else {
                    jogo.marcar(casa1)
                    jogo.prepararMovimento()
                }
            }
        } catch (TypeError) {

        }



    }


}