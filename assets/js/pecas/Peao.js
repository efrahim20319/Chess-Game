class Peao extends Peca {
    constructor() {
        super()
        this.primeira_jogada = true
    }

    mostrarDisponiveis(peao) {
        let pos = jogo.obetrPosicao(peao.parentNode)
        peao.setAttribute("data-marcador", "")
        let [x, y] = pos
        try {
            if (peao.classList.contains("preto")) {
                let casa1 = jogo.casas[x + 1][y]
                let casa2 = jogo.casas[x + 2][y]
                let casasAhMarcar = [casa1, casa2]
                if (peao.dataset.primeira_play == "true") {
                    jogo.marcarEmSequencia(casasAhMarcar)
                    jogo.prepararMovimento()
                } else {
                    jogo.marcar(casa1)
                    jogo.prepararMovimento()
                }

            } else {
                let casa1 = jogo.casas[x - 1][y]
                let casa2 = jogo.casas[x - 2][y]
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