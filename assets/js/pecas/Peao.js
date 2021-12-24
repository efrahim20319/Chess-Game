class Peao extends Peca {
    constructor() {
        super()
        this.primeira_jogada = true
    }

    mostrarDisponiveis(peao) {
        let pos = jogo.obetrPosicao(peao.parentNode)
        peao.setAttribute("data-marcador","")
        let [x, y] = pos
        try {
            jogo.casas[x - 2][y].classList.toggle("marcado")
            jogo.casas[x - 1][y].classList.toggle("marcado")
            Jogo.prepararMovimento()
        } catch (TypeError) {
            
        }
        
        

    }


}