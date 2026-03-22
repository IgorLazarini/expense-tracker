const form = document.getElementById("formGasto");
const inputDescricao = document.getElementById("Descricao");
const inputValor = document.getElementById("Valor");
const inputCateg = document.getElementById("Categoria");
const lista = document.getElementById("listaGastos");
const totalgastos = document.getElementById("total");
let gtotal = 0;
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

gastos.forEach(function(gastoS){

    const item = document.createElement ("li");
    item.textContent = gastoS.descricao + " - R$" + gastoS.valor + " (" + gastoS.categoria + ")";
    const bExcluir = document.createElement("button");
        bExcluir.textContent = "X";
    bExcluir.addEventListener("click", function(){
        item.remove();
        gtotal -= gastoS.valor;
        gastos = gastos.filter(function(g) {
            return g!== gastoS;
        })
        localStorage.setItem("gastos", JSON.stringify(gastos));

        totalgastos.textContent = gtotal;
        criarGrafico();
    })
    item.appendChild(bExcluir);
    lista.appendChild(item);

    gtotal += gastoS.valor;
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
        criarGrafico();
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
    criarGrafico();
});
function gerarDadosGrafico() {
    let totalCategoria = {};
        
    gastos.forEach(function(gastoGrafico){
        if (totalCategoria[gastoGrafico.categoria]) {
            totalCategoria[gastoGrafico.categoria] += gastoGrafico.valor;
        } else {
            totalCategoria[gastoGrafico.categoria] = gastoGrafico.valor;
        }
    });
    return totalCategoria;
}
function criarGrafico() {
    const antigo = document.getElementById("graficoGastos");
    if (antigo) {
        antigo.remove();
    }
    const novoCanvas = document.createElement("canvas");
    novoCanvas.id = "graficoGastos";
    document.body.appendChild(novoCanvas);

    const dados = gerarDadosGrafico();
    const ctx = document.getElementById("graficoGastos");

    new Chart (ctx, {
        type: "pie",
        data: {
            labels: Object.keys(dados),
            datasets: [{
                data: Object.values(dados)
            }]
        }
    });
} criarGrafico();
