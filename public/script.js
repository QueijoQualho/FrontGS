async function pegaEstadoID(value) {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

    try {
        const response = await fetch(url);
        const data = await response.json()

        const estadoEncontrado = data.find(e => e.sigla === value);

        if (estadoEncontrado) {
            const id = estadoEncontrado.id
            return id
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

async function pegarMunicipio(estadoID) {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoID}/municipios`
    const selectMunicipio = document.getElementById('municipio')

    selectMunicipio.innerHTML = '';
    try {
        const response = await fetch(url)
        const data = await response.json()

        data.forEach(e => {
            const option = document.createElement('option')
            option.value = e.id
            option.text = e.nome

            selectMunicipio.appendChild(option)
        });

    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

const inputEstado = document.getElementById("estados")

inputEstado.addEventListener('change', async (e) => {
    const value = e.target.value

    const IdEstado = await pegaEstadoID(value)

    pegarMunicipio(IdEstado)
})

document.addEventListener('DOMContentLoaded', async () => {
    const unidade = document.getElementById('unidade');

    unidade.innerHTML = '';

    const url = '/tipounidades';


    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        data.sort((a, b) => a.text.localeCompare(b.text));

        data.forEach(e => {
            const option = document.createElement('option');
            option.value = e.value;
            option.text = e.text;

            unidade.appendChild(option);
        })

    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});