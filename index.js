const express = require("express");
const axios = require("axios"); // Importe o Axios para fazer requisições HTTP
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

const API_ENDPOINT = process.env.API_ENDPOINT;

const app = express();

const port = 3001;

const path = require('path'); // Importe o módulo 'path'

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Interface-SIGA', 'views')));

app.set('views', path.join(__dirname, 'Interface-SIGA', 'views'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Pasta para arquivos estáticos como CSS

// Endpoint configurável
console.log(API_ENDPOINT);
// Rota para exibir todos os professores
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_ENDPOINT + "/professores");
    const professores = response.data;

    res.render("index", { professores });
  } catch (error) {
    console.error("Erro ao buscar professores:", error.message);
    res.render("error", { message: "Erro ao buscar professores" });
  }
});

// Rota para exibir o formulário de cadastro de professor
app.get("/Add", (req, res) => {
  res.render("Add");
});

// Rota para processar o cadastro de professor
app.post("/Add", async (req, res) => {
  try {
    const { matricula, nome, data_de_nascimento } = req.body;
    // Valide os dados antes de enviar para a API

    await axios.post(API_ENDPOINT + "/professores", { matricula, nome, data_de_nascimento });

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao cadastrar professor:", error.message);
    res.render("error", { message: "Erro ao cadastrar professor" });
  }
});

// Rota para exibir detalhes de um professor
app.get("/professor/:matricula", async (req, res) => {
  const matricula = req.params.matricula;

  try {
    const response = await axios.get(API_ENDPOINT + "/professores/" + matricula);
    const professor = response.data;

    res.render("detalhes", { professor });
  } catch (error) {
    console.error("Erro ao buscar detalhes do professor:", error.message);
    res.render("error", { message: "Erro ao buscar detalhes do professor" });
  }
});

// Rota para editar um professor
app.get("/editar/:matricula", async (req, res) => {
  const matricula = req.params.matricula;

  try {
    const response = await axios.get(API_ENDPOINT + "/professores/" + matricula);
    const professor = response.data;

    res.render("editar", { professor });
  } catch (error) {
    console.error("Erro ao buscar detalhes do professor:", error.message);
    res.render("error", { message: "Erro ao buscar detalhes do professor" });
  }
});

// Rota para processar a edição de um professor
app.post("/editar/:matricula", async (req, res) => {
  const matricula = req.params.matricula;

  try {
    const { matricula: newMatricula, nome } = req.body;
    // Valide os dados antes de enviar para a API

    await axios.put(API_ENDPOINT + "/professores/" + matricula, { matricula: newMatricula, nome });

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao editar professor:", error.message);
    res.render("error", { message: "Erro ao editar professor" });
  }
});

// Rota para excluir um professor
app.post("/excluir/:matricula", async (req, res) => {
  const matricula = req.params.matricula;

  try {
    await axios.delete(API_ENDPOINT + "/professores/" + matricula);

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao excluir professor:", error.message);
    res.render("error", { message: "Erro ao excluir professor" });
  }
});
app.listen(port, () => {
  console.log("Iniciei na porta " + port);
});
