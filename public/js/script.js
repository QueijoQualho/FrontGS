import { pegarMunicipio, gerarEstados } from "./ibgeFunctions.js";
import { gerarUnidades, gerarResultados } from "./nodeFunctions.js";

const selectUnidade = document.getElementById("unidade");
const selectEstados = document.getElementById("estados");
const selectMunicipio = document.getElementById("municipio");

/* Gera os municipios */
selectEstados.addEventListener('change', async (e) => {
    const value = e.target.value

    pegarMunicipio(value)
})

selectUnidade.addEventListener('change', atualizarResultados);
selectEstados.addEventListener('change', atualizarResultados);
selectMunicipio.addEventListener('change', atualizarResultados);

async function atualizarResultados() {
    const codUnidade = selectUnidade.value;
    const codEstado = selectEstados.value;
    const codMunicipio = selectMunicipio.value;

    // Limpe os resultados antigos
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = '';

    // Chame a função gerarResultados com os novos valores
    await gerarResultados(codUnidade, codEstado, codMunicipio);
}


/* Gera o conteudo default do site */
document.addEventListener('DOMContentLoaded', async () => {
    /* Unidades */
    gerarUnidades()

    /* Estados */
    gerarEstados()
});