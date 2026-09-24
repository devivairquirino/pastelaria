// Abre e fecha o menu no celular
const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", function () {
    menu.classList.toggle("aberto");
});

// Fecha o menu depois que o usuário escolhe uma opção
const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("aberto");
    });
});

// Filtro do cardápio por grupos
// Cada grupo reúne um título + seus produtos e possui um data-tipo.
// Assim, o título nunca aparece sozinho em outra categoria.
const botoesFiltro = document.querySelectorAll(".filtro");
const gruposCardapio = document.querySelectorAll(".grupo-cardapio");

function mostrarCategoria(tipoEscolhido) {
    gruposCardapio.forEach(function (grupo) {
        const tipoGrupo = grupo.getAttribute("data-tipo");

        if (tipoGrupo === tipoEscolhido) {
            grupo.classList.remove("escondido");
        } else {
            grupo.classList.add("escondido");
        }
    });
}

botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {

        // Remove o estado ativo de todos os botões
        botoesFiltro.forEach(function (outroBotao) {
            outroBotao.classList.remove("ativo");
        });

        // Ativa somente o botão clicado
        botao.classList.add("ativo");

        // Descobre a categoria escolhida
        const tipoEscolhido = botao.getAttribute("data-tipo");

        // Mostra todos os grupos daquela categoria e esconde os demais
        mostrarCategoria(tipoEscolhido);
    });
});

// Deixa a primeira categoria visível ao carregar a página
const filtroInicial = document.querySelector(".filtro.ativo");

if (filtroInicial) {
    mostrarCategoria(filtroInicial.getAttribute("data-tipo"));
}


// Carrossel de fotos
const carrosselTrack = document.querySelector(".carrossel-track");
const slides = document.querySelectorAll(".slide");
const botaoAnterior = document.querySelector(".carrossel-btn.anterior");
const botaoProximo = document.querySelector(".carrossel-btn.proximo");

let indiceAtual = 0;

// Quantidade de fotos visíveis em cada tamanho de tela
function quantidadeVisivel() {
    if (window.innerWidth >= 1024) {
        return 3;
    }

    if (window.innerWidth >= 768) {
        return 2;
    }

    return 1;
}

// Última posição possível do carrossel
function ultimoIndice() {
    return Math.max(0, slides.length - quantidadeVisivel());
}

// Atualiza a posição do carrossel
function atualizarCarrossel() {
    if (!carrosselTrack || !slides.length) {
        return;
    }

    const larguraSlide = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(carrosselTrack).gap) || 0;
    const deslocamento = indiceAtual * (larguraSlide + gap);

    carrosselTrack.style.transform = `translateX(-${deslocamento}px)`;
}

// Próxima foto
if (botaoProximo) {
    botaoProximo.addEventListener("click", function () {
        if (indiceAtual < ultimoIndice()) {
            indiceAtual++;
        } else {
            indiceAtual = 0;
        }

        atualizarCarrossel();
    });
}

// Foto anterior
if (botaoAnterior) {
    botaoAnterior.addEventListener("click", function () {
        if (indiceAtual > 0) {
            indiceAtual--;
        } else {
            indiceAtual = ultimoIndice();
        }

        atualizarCarrossel();
    });
}

// Recalcula a posição quando a tela muda de tamanho
window.addEventListener("resize", function () {
    if (indiceAtual > ultimoIndice()) {
        indiceAtual = ultimoIndice();
    }

    atualizarCarrossel();
});

atualizarCarrossel();
