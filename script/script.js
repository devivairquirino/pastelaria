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

// Filtro simples do cardápio
const botoesFiltro = document.querySelectorAll(".filtro");
const itensCardapio = document.querySelectorAll(".item-cardapio");

botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {

        botoesFiltro.forEach(function (outroBotao) {
            outroBotao.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        const tipoEscolhido = botao.getAttribute("data-tipo");

        itensCardapio.forEach(function (item) {
            const tipoItem = item.getAttribute("data-tipo");

            if (tipoItem === tipoEscolhido) {
                item.classList.remove("escondido");
            } else {
                item.classList.add("escondido");
            }
        });
    });
});
