let jogo = new Jogo()
jogo.motarPecas(0,1, "preto")
jogo.motarPecas(7,6)

let jogador1 = new Jogador("Efrahim", "preto")
let jogador2 = new Jogador("Nsimba", "branco")

jogo.jogador1 = jogador1
jogo.jogador2 = jogador2

jogador1.iniciarPeoes(jogo.casas[1])
jogador2.iniciarPeoes(jogo.casas[6])

console.log(jogo);