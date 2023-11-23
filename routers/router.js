import express from "express";
import axios from 'axios';

const router = express.Router();

router.get('/tipounidades', async (req, res) => {
  const url = 'https://apidadosabertos.saude.gov.br/cnes/tipounidades';

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data && data.tipos_unidade) {
      const options = data.tipos_unidade.map(e => ({
        value: e.codigo_tipo_unidade,
        text: e.descricao_tipo_unidade,
      }));

      res.json(options);
    } else {
      res.status(500).json({ error: 'Resposta da API não possui a estrutura esperada.' });
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    res.status(500).json({ error: 'Erro na requisição.' });
  }
});


router.get('/estabelecimentos', async (req, res) => {
    const data = fetchEstabeleciomentos()
})

async function fetchEstabeleciomentos(codUnidade, codEstado, codMunicipio = 0) {
  const urlDefault = "https://apidadosabertos.saude.gov.br/cnes/estabelecimentos"

  let urlApi;

  if (codMunicipio !== 0) {
    urlApi = `${urlDefault}/?codigo_tipo_unidade=${codUnidade}&codigo_uf=${codEstado}&limit=20`
  } else {
    urlApi = `${urlDefault}/?codigo_tipo_unidade=${codUnidade}&codigo_uf=${codEstado}&codigo_municipio=${codMunicipio}&limit=20`
  }

  try {
    const response = await axios.get(urlApi);
    const data = response.data;

    if (data.estabelecimentos !== null) {
      const options = data.estabelecimentos.map(e => {
        nome: e.nome_fantasia

      })

      return options;
    } else {
      return null;
    }

  } catch (error) {
    console.error('Erro na requisição:', error);
    res.status(500).json({ error: 'Erro na requisição.' });
  }
}

export default router;