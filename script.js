const form = document.getElementById("formGasto");
const inputDescricao = document.getElementById("Descricao");
const inputValor = document.getElementById("Valor");
const inputCateg = document.getElementById("Categoria");
const lista = document.getElementById("listaGastos");
const totalgastos = document.getElementById("total");
let gtotal = 0;
let gastos = {
    descricao:
    valor:
    categoria:
};
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = inputDescricao.value;
    const valor = Number(inputValor.value);
    const categoria = inputCateg.value;
    
    const item = document.createElement("li");
        item.textContent = descricao + " - R$" + valor + " (" + categoria + ")";
    const bExcluir = document.createElement("button");
        bExcluir.textContent = "X";
    bExcluir.addEventListener("click", function(){
        item.remove();
        gtotal -= valor;

        totalgastos.textContent = gtotal;
    });
        item.appendChild(bExcluir);
        lista.appendChild(item);

    gtotal += valor;

    totalgastos.textContent = gtotal;

    console.log(descricao);
    console.log(valor);
    console.log(categoria);
});
