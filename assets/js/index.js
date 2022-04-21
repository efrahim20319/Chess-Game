import { Jogo } from "./Jogo.js";
import { Jogador } from "./Jogador.js";
const jogador1 = new Jogador("Nsimba", "branco");
const jogador2 = new Jogador("Efrahim", "preto");
Jogo.init(jogador1, jogador2);
