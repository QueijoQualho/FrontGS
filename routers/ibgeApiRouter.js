import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import https from 'https';

const router = express.Router();

const allowLegacyRenegotiationforNodeJsOptions = {
    httpsAgent: new https.Agent({
      // for self-signed you could also add
      // rejectUnauthorized: false,
      // allow legacy server
      secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
    }),
  };
  
  function makeRequest(url, data) {
    return axios({
      ...allowLegacyRenegotiationforNodeJsOptions,
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      data,
    });
  }
  
  router.get('/estadoID/:value', async (req, res) => {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    const value = req.params.value;
  
    try {
      const response = await makeRequest(url, { some: 'data' }); // Ajuste o objeto de dados conforme necessário
  
      const data = response.data;
  
      const estadoEncontrado = data.find(e => e.sigla === value);
  
      if (estadoEncontrado) {
        const id = estadoEncontrado.id;
        res.json({ id });
      } else {
        res.json({ id: null });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      res.status(500).json({ error: 'Erro na requisição.' });
    }
  });
  

router.get('/municipio', async (req, res) => {
    const estadoId = req.query.estadoID;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const nomeId = data.map(e => ({
            nome: e.nome,
            id: e.id,
        }));

        res.json(nomeId);
    } catch (error) {
        console.error('Erro na requisição:', error);
        res.status(500).json({ error: 'Erro na requisição.' });
    }
});


export default router;
