class Jogo {
    constructor() {
        this.casas = this.obterMatrix()
        this._jodador1 = null
        this._jodador2 = null
    }

    set jogador1(jogador) {
        this._jodador1 = jogador
    }

    get jogador1() {
        return this._jodador1
    }

    set jogador2(jogador) {
        this._jodador2 = jogador
    }

    get jogador2() {
        return this._jodador2
    }

    obetrPosicao(elemento) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.casas[i][j] == elemento)
                    return [i, j]
            }
        }
    }

    obterMatrix() {
        let casas = document.querySelectorAll(".casa")
        let casasMatrix = new Array(8)
        for (let i = 0; i < 8; i++) {
            casasMatrix[i] = new Array(8)
        }
        for (let i = 0, h = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++, h++) {
                casasMatrix[i][j] = casas[h]
            }
        }
        return casasMatrix
    }

    criarPeca(nome) {
        let peca = document.createElement("span")
        peca.classList.add("peca", nome)
        return peca
    }

    removerEventos(elemento) {
        let aux = elemento.outerHTML
        console.log(aux, elemento);
        elemento.outerHTML = aux
    }


    desmarcarTudo() {
        let marcador = document.querySelector("[data-marcador]")
        if (marcador) 
            marcador.removeAttribute("data-marcador")
        this.casas.forEach(linha => {
            for (let casa of linha) 
                casa.classList.remove("marcado")
        })
    }

    motarPecas(pos1, pos2, cor = "branco") {
        let ordem = ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'bispo', 'cavalo', 'torre']
        let linha_1 = this.casas[pos1]
        let linha_2 = this.casas[pos2]
        for (let i = 0; i < linha_1.length; i++) {
            let peao = this.criarPeca("peao")
            let item_linha1 = this.criarPeca(ordem[i])
            item_linha1.classList.add(cor)
            peao.classList.add(cor)
            linha_1[i].appendChild(item_linha1)
            linha_2[i].appendChild(peao)
        }
    }


    static prepararMovimento() {
        let marcador = document.querySelector("[data-marcador]")
        let marcados = document.querySelectorAll(".marcado")
        console.log(marcador, marcados);
        marcados.forEach(marcado => {
            marcado.addEventListener("click", function (params) {
                if (marcado.classList.contains("marcado"))
                    console.log(marcado);
            })
        })
    }

    static mover(marcador, marcado) {

    }
}