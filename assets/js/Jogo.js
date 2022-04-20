export class Jogo {
    static init(jogador1, jogador2) {
        Jogo.casas = Jogo.obterMatrix();
        Jogo.alter = true; //vez da peca branca
        Jogo.jogador1 = jogador1;
        Jogo.jogador2 = jogador2;
        Jogo.IndisponisveisAoRei();
    }
    static obetrPosicao(elemento) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.casas[i][j] == elemento)
                    return [i, j];
            }
        }
    }
    static obterMatrix() {
        let casas = document.querySelectorAll(".casa");
        let casasMatrix = new Array(8);
        for (let i = 0; i < 8; i++) {
            casasMatrix[i] = new Array(8);
        }
        for (let i = 0, h = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++, h++) {
                casasMatrix[i][j] = casas[h];
            }
        }
        return casasMatrix;
    }
    static pintarTabuleiro() {
        // Não consegui pintar com CSS, kkk, estas a vontade para faze-lo
        let alter = true;
        Jogo.casas.forEach((linha) => {
            linha.forEach((casa) => {
                if ((alter = !alter))
                    casa.classList.add("casaPreta");
            });
            alter = !alter;
        });
    }
    static obterCasa(linha, coluna) {
        try {
            return Jogo.casas[linha][coluna];
        }
        catch (TypeError) {
            return undefined;
        }
    }
    static corDaPeca(peca) {
        if (peca.classList.contains("preto"))
            return "preto";
        return "branco";
    }
    static corEhDiferente(peca1, peca2) {
        const corPeca1 = Jogo.corDaPeca(peca1);
        const corPeca2 = Jogo.corDaPeca(peca2);
        return corPeca1 != corPeca2;
    }
    static criarPeca(nome) {
        const peca = document.createElement("span");
        peca.classList.add("peca", nome);
        return peca;
    }
    static casaEstaOcupada(casa) {
        try {
            const peca = casa.firstElementChild;
            const marcador = document.querySelector("[data-marcador]");
            if (peca) {
                const corDaPeca = Jogo.corDaPeca(peca);
                const corDoMarcador = Jogo.corDaPeca(marcador);
                if (corDaPeca != corDoMarcador &&
                    !marcador.classList.contains("peao") &&
                    !marcador.classList.contains("torre") &&
                    !marcador.classList.contains("bispo") &&
                    !marcador.classList.contains("rainha"))
                    return false;
            }
            if (casa.childNodes.length)
                return true;
            return false;
        }
        catch (TypeError) {
            // console.log("ocupado:", casa);
        }
    }
    static PossuiPeca(casa) {
        if (casa == undefined)
            return false;
        if (casa.childNodes.length)
            return true;
        return false;
    }
    static marcar(casa, forceOption = false) {
        try {
            if (Jogo.casaEstaOcupada(casa) && !forceOption) {
                // console.log("Esta ocupado");
                return;
            }
            if (Jogo.PossuiPeca(casa))
                casa.classList.add("alvo");
            casa.classList.add("marcado");
        }
        catch (TypeError) {
            // console.log("Erro ao marcar");
        }
    }
    static marcarEmSequencia(casas, force = false) {
        for (let i = 0; i < casas.length; i++) {
            const casa = casas[i];
            if (Jogo.casaEstaOcupada(casa))
                return;
            Jogo.marcar(casa, force);
        }
    }
    static marcarGrupo(casas, forceOption = false) {
        for (const casa of casas) {
            Jogo.marcar(casa, forceOption);
        }
    }
    static removerEventos(elemento, ClasseRemovida = "") {
        elemento.classList.remove(ClasseRemovida);
        let aux = elemento.outerHTML;
        elemento.outerHTML = aux;
    }
    static desmarcarTudo() {
        let marcador = document.querySelector("[data-marcador]");
        if (marcador)
            marcador.removeAttribute("data-marcador");
        Jogo.casas.forEach((linha) => {
            for (let casa of linha) {
                casa.classList.remove("cheque");
                casa.classList.remove("alvo");
                casa.classList.remove("selecionado");
                if (casa.classList.contains("marcado")) {
                    this.removerEventos(casa, "marcado");
                }
            }
        });
        Jogo.casas = Jogo.obterMatrix();
    }
    static motarPecas(pos1, pos2, cor = "branco") {
        let ordem = [
            "torre",
            "cavalo",
            "bispo",
            "rainha",
            "rei",
            "bispo",
            "cavalo",
            "torre",
        ];
        let linha_1 = Jogo.casas[pos1];
        let linha_2 = Jogo.casas[pos2];
        for (let i = 0; i < linha_1.length; i++) {
            let peao = Jogo.criarPeca("peao");
            let item_linha1 = Jogo.criarPeca(ordem[i]);
            item_linha1.classList.add(cor);
            peao.classList.add(cor);
            linha_1[i].appendChild(item_linha1);
            linha_2[i].appendChild(peao);
        }
    }
    static prepararMovimento() {
        const marcador = document.querySelector("[data-marcador]");
        const marcados = document.querySelectorAll(".marcado");
        marcados.forEach((marcado) => {
            marcado.addEventListener("click", () => {
                Jogo.mover(marcador, marcado);
            });
        });
    }
    static trocarVez() {
        Jogo.jogador1.vez = !Jogo.jogador1.vez;
        Jogo.jogador2.vez = !Jogo.jogador2.vez;
        Jogo.alter = !Jogo.alter;
    }
    static pausar() {
        Jogo.jogador1.vez = false;
        Jogo.jogador2.vez = false;
        Jogo.alter = !Jogo.alter;
    }
    static resumir() {
        if (Jogo.alter) {
            Jogo.jogador1.vez = true;
            Jogo.jogador2.vez = false;
        }
        else {
            //O unico else do codigo
            Jogo.jogador1.vez = false;
            Jogo.jogador2.vez = true;
        }
    }
    static promover(peao) {
        const promoter = document.querySelector(".promoter");
        peao.dataset.promote = "";
        promoter.classList.toggle("hidden");
        const options = document.querySelectorAll(".promoter__option");
        for (const option of options) {
            option.addEventListener("click", () => {
                const peao = document.querySelector("[data-promote]");
                const nomeDaPeca = option.textContent.toLowerCase();
                const corDaPeca = Jogo.corDaPeca(peao);
                const elementoPai = peao.parentNode;
                peao.remove();
                const pecaCriada = Jogo.criarPeca(nomeDaPeca);
                pecaCriada.classList.add("peca", `${corDaPeca}`);
                elementoPai.appendChild(pecaCriada);
                promoter.classList.toggle("hidden");
                Jogo.resumir();
                Jogo.removerTodosEventos();
                Jogo.atualizar();
                Jogo.EstaEmCheque();
            });
        }
    }
    static tratarPeao(marcador, marcado) {
        const linha = Jogo.obetrPosicao(marcado)[0];
        if (marcador.classList.contains("peao")) {
            if (marcador.dataset.primeira_play) {
                marcador.dataset.primeira_play = "false";
            }
            if (linha == 0 || linha == 7) {
                Jogo.pausar();
                Jogo.trocarVez(); //Tive que trocar de vez porque senao, não pausaria o jogo no metodo comer
                if (Jogo.corDaPeca(marcador) == "branco") {
                    Jogo.promover(marcador);
                }
                if (Jogo.corDaPeca(marcador) == "preto") {
                    Jogo.promover(marcador);
                }
            }
        }
    }
    static removerTodosEventos() {
        const casas = [...document.querySelectorAll(".casa")];
        const casasOcupadas = casas.filter((casa) => Jogo.PossuiPeca(casa));
        for (const casa of casasOcupadas) {
            const pecaAntiga = casa.firstElementChild;
            const pecaNova = pecaAntiga.cloneNode(true);
            pecaAntiga.remove();
            casa.appendChild(pecaNova);
        }
    }
    static tipoDaPeca(peca) {
        const ordem = ["torre", "cavalo", "bispo", "rainha", "rei", "peao"];
        for (const item of ordem)
            if (peca.classList.contains(item))
                return item;
    }
    static atualizar() {
        Jogo.jogador1.atualizar();
        Jogo.jogador2.atualizar();
    }
    static mostrarVitimas() {
        let cor = "";
        let killers = [];
        if (!Jogo.alter) {
            cor = this.jogador1.corDasPecas;
            killers = this.jogador1.vitimas();
        }
        else {
            cor = this.jogador2.corDasPecas;
            killers = this.jogador2.vitimas();
        }
        const killersSet = new Set(killers);
        return new Array(...killersSet);
    }
    static EstaEmCheque() {
        const efeitoDeSom = new Audio("assets/audio/cheque.mp3");
        const vitimas = Jogo.mostrarVitimas().filter((casa) => Jogo.tipoDaPeca(casa.firstElementChild) == "rei");
        if (vitimas.length) {
            efeitoDeSom.play();
            vitimas[0].classList.add("cheque");
        }
    }
    static IndisponisveisAoRei() {
        let indisponiveis;
        let jogador;
        if (Jogo.alter) {
            indisponiveis = new Set(this.jogador2.IndisponiveisAoReiAdversario());
            this.jogador1.casasIndisponiveisAoRei = [...indisponiveis];
        }
        else {
            indisponiveis = new Set(this.jogador1.IndisponiveisAoReiAdversario());
            this.jogador2.casasIndisponiveisAoRei = [...indisponiveis];
        }
    }
    static mover(marcador, marcado) {
        Jogo.tratarPeao(marcador, marcado);
        if (Jogo.PossuiPeca(marcado))
            Jogo.comer(marcado);
        marcado.appendChild(marcador);
        Jogo.desmarcarTudo();
        Jogo.trocarVez();
        Jogo.removerTodosEventos();
        Jogo.atualizar();
        Jogo.EstaEmCheque();
        Jogo.IndisponisveisAoRei();
    }
    static comer(marcado) {
        marcado.innerHTML = "";
    }
}
Jogo.alter = true;
