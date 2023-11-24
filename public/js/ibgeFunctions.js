export async function pegarMunicipio(estadoID) {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoID}/municipios`
    const selectMunicipio = document.getElementById('municipio')

    selectMunicipio.innerHTML = '<option value="0">--</option>';
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

export async function gerarEstados() {
    const estado = document.getElementById('estados')

    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

    try {
        const response = await fetch(url);
        const data = await response.json()

        data.sort((a, b) => a.nome.localeCompare(b.nome));

        data.forEach(e => {
            const option = document.createElement('option')
            option.value = e.id
            option.text = e.nome

            estado.appendChild(option)
        })
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}