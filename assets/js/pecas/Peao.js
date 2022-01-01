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
            if(this.primeira_jogada) {
                jogo.casas[x - 2][y].classList.toggle("marcado")
                jogo.casas[x - 1][y].classList.toggle("marcado")
                jogo.prepararMovimento()
                this.primeira_jogada = false
            } else {
                jogo.casas[x - 1][y].classList.toggle("marcado")
                jogo.prepararMovimento()           
            }
        } catch (TypeError) {
            
        }
        
        

    }


}