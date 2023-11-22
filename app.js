const express = require('express');
const cors = require('cors');
const axios = require('axios')

const app = express();
const port = 3000;

app.use(cors());

app.get('/tipounidades', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
