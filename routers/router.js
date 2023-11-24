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
  try {
    const codUnidade = req.query.codUnidade;
    const codEstado = req.query.codEstado;
    const codMunicipio = req.query.codMunicipio || 0;

    const data = await buscarEstabelecimentos(codUnidade, codEstado, codMunicipio);
    res.json({ data });
  } catch (error) {
    console.error('Erro na requisição:', error.message);
    res.status(500).json({ error: 'Erro na requisição.' });
  }
});

async function buscarEstabelecimentos(codUnidade, codEstado, codMunicipio) {
  const urlPadrao = "https://apidadosabertos.saude.gov.br/cnes/estabelecimentos";

  let urlApi;

  if (codMunicipio !== 0) {
    urlApi = `${urlPadrao}?codigo_tipo_unidade=${codUnidade}&codigo_uf=${codEstado}&codigo_municipio=${codMunicipio}&limit=20`;
  } else {
    urlApi = `${urlPadrao}?codigo_tipo_unidade=${codUnidade}&codigo_uf=${codEstado}&limit=20`;
  }

  console.log(urlApi);

  try {
    const resposta = await axios.get(urlApi);
    const dados = resposta.data;

    if (dados.estabelecimentos !== null) {
      const opcoes = dados.estabelecimentos.map(e => ({
        nome: e.nome_fantasia,
        cep: e.codigo_cep_estabelecimento
      }));
      return opcoes;
    } else {
      throw new Error('Dados da API estão nulos.');
    }
  } catch (erro) {
    console.error('Erro na requisição:', erro.message);
    throw new Error('Erro na requisição.');
  }
}


export default router;