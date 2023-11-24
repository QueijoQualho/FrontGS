export async function gerarUnidades() {
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
}

export async function gerarResultados(codUnidade, codEstado, codMunicipio = 0) {
    const results = document.getElementById("results")

    const urlDefault = "/estabelecimentos";
    let urlApi;

    if (codMunicipio !== 0) {
        urlApi = `${urlDefault}?codUnidade=${codUnidade}&codEstado=${codEstado}&codMunicipio=${codMunicipio}`;
    } else {
        urlApi = `${urlDefault}?codUnidade=${codUnidade}&codEstado=${codEstado}`;
    }

    console.log(urlApi);
    
    try {
        const response = await fetch(urlApi);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const sortedResult = data.data.sort((a, b) => a.nome.localeCompare(b.nome));

        sortedResult.forEach(e => {
            const p = document.createElement('p')

            p.textContent = e.nome

            results.appendChild(p)

        });

    } catch (error) {
        console.error('Erro na requisição:', error.message);
    }
}