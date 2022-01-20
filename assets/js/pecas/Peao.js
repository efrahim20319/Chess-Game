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
                if (peao.dataset.primeira_play == "true") {
                    jogo.marcar(x + 2, y)
                    jogo.marcar(x + 1, y)
                    jogo.prepararMovimento()
                } else {
                    jogo.marcar(x + 1, y)
                    jogo.prepararMovimento()
                }

            } else {
                if (peao.dataset.primeira_play == "true") {
                    jogo.marcar(x - 2, y)
                    jogo.marcar(x - 1, y)
                    jogo.prepararMovimento()
                } else {
                    jogo.marcar(x - 1, y)
                    jogo.prepararMovimento()
                }
            }
        } catch (TypeError) {

        }



    }


}