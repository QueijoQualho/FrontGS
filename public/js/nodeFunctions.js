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

    try {
        const response = await fetch(urlApi);
    
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
    
        const data = await response.json();
    
        if (data.data != null && data.data.length > 0) {
            const sortedResult = data.data.sort((a, b) => a.nome.localeCompare(b.nome));
    
            sortedResult.forEach(e => {
                const div = document.createElement('div');
    
                div.className = "card";
    
                div.innerHTML = `
                    <div class="card-nome">
                        <h3>${e.nome || 'Não possui'}</h3>
                    </div>
    
                    <div>
                        <h5>Endereço</h5>
                        <p>${e.endereco || 'Não possui'}</p>
                    </div>
    
                    <div>
                        <h5>Número</h5>
                        <p>${e.numero || 'Não possui'}</p>
                    </div>
    
                    <div>
                        <h5>Bairro</h5>
                        <p>${e.bairro || 'Não possui'}</p>
                    </div>
    
                    <div>
                        <h5>CEP</h5>
                        <p>${e.cep || 'Não possui'}</p>
                    </div>
    
                    <div>
                        <h5>Telefone</h5>
                        <p>${e.telefone || 'Não possui'}</p>
                    </div>
    
                    <div>
                        <h5>Email</h5>
                        <p>${e.email || 'Não possui'}</p>
                    </div>
                `;
    
                results.appendChild(div);
            });
        } else {
            const h2 = document.createElement('h2');
            h2.textContent = 'Nenhum estabelecimento foi encontrado.';
            results.appendChild(h2);
        }
    } catch (error) {
        console.error('Erro na requisição:', error.message);
    }
    
}