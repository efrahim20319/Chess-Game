class Jogador {
    constructor(nome, cor) {
        this.nome = nome
        this.corDasPecas = cor
        this.n_pecas = 16
        this.peoes = new Array(8)
    }

    iniciarPeoes() {
        const linha = document.querySelectorAll(`.peao.${this.corDasPecas}`)
        for (let i = 0; i < 8; i++) {
            this.peoes[i] = new Peao()
            if (linha[i].dataset.primeira_play == undefined) {
                linha[i].dataset.primeira_play = true
            }
            this.peoes[i].elemento = linha[i]
            let inst = this.peoes[i]
            linha[i].addEventListener("click", function marcar () {
                jogo.desmarcarTudo()
                inst.mostrarDisponiveis(this)
            })
        }
    }
}