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
