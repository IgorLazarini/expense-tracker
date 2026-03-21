const form = document.getElementById("formGasto");
const inputDescricao = document.getElementById("Descricao");
const inputValor = document.getElementById("Valor");
const inputCateg = document.getElementById("Categoria");
const lista = document.getElementById("listaGastos");
const totalgastos = document.getElementById("total");
let gtotal = 0;
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

gastos.forEach(function(gasto){

    const item = document.createElement ("li");
    item.textContent = gasto.descricao + " - R$" + gasto.valor + " (" + gasto.categoria + ")";
    const bExcluir = document.createElement("button");
        bExcluir.textContent = "X";
    bExcluir.addEventListener("click", function(){
        item.remove();
        gtotal -= gasto.valor;
        gastos = gastos.filter(function(g) {
            return g!== gasto;
        })
        localStorage.setItem("gastos", JSON.stringify(gastos));

        totalgastos.textContent = gtotal;
    })
    item.appendChild(bExcluir);
    lista.appendChild(item);

    gtotal += gasto.valor;
});
    totalgastos.textContent = gtotal;

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
     gastos = gastos.filter(function(dg) {
        return!(
        dg.descricao === descricao &&
        dg.valor === valor &&
        dg.categoria === categoria
        );
    });
    localStorage.setItem("gastos", JSON.stringify(gastos));
        totalgastos.textContent = gtotal;
    });
    gastos.push({
        descricao: descricao,
        valor: valor,
        categoria: categoria
    });
    localStorage.setItem("gastos", JSON.stringify(gastos));
    
    gtotal += valor;

    totalgastos.textContent = gtotal;

    console.log(descricao);
    console.log(valor);
    console.log(categoria);
    
    item.appendChild(bExcluir);
    lista.appendChild(item);
});
