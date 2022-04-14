import { Jogo } from "./Jogo.js"
import { Jogador } from "./Jogador.js"

const jogador1 = new Jogador("Efrahim", "preto")
const jogador2 = new Jogador("Nsimba", "branco")

Jogo.init(jogador1, jogador2)
Jogo.pintarTabuleiro()

Jogo.motarPecas(0, 1, "preto")
Jogo.motarPecas(7, 6)

Jogo.atualizar()