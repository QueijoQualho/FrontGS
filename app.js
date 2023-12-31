import express from "express";
import cors from 'cors';
import router from "./routers/router.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use('/', router)

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
