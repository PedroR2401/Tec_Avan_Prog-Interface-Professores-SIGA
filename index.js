const express = require("express");
const axios = require("axios"); // Importe o Axios para fazer requisições HTTP
const bodyParser = require("body-parser");

const app = express();

const port = 3001;

const path = require('path'); // Importe o módulo 'path'

app.use(express.static(path.join(__dirname, 'Interface-SIGA', 'views')));

app.set('views', path.join(__dirname, 'Interface-SIGA', 'views'));


app.set('view engine', 'ejs');


// Define o mecanismo de visualização como EJS



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Pasta para arquivos estáticos como CSS

// Endpoint configurável
const API_ENDPOINT = "/API-PROFESORES";

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
    const { matricula, nome } = req.body;
    // Valide os dados antes de enviar para a API

    await axios.post(API_ENDPOINT + "/professores", { matricula, nome });

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao cadastrar professor:", error.message);
    res.render("error", { message: "Erro ao cadastrar professor" });
  }
});

// Rota para exibir detalhes de um professor
app.get("/professor/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(API_ENDPOINT + "/professores/" + id);
    const professor = response.data;

    res.render("detalhes", { professor });
  } catch (error) {
    console.error("Erro ao buscar detalhes do professor:", error.message);
    res.render("error", { message: "Erro ao buscar detalhes do professor" });
  }
});

// Rota para editar um professor
app.get("/editar/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(API_ENDPOINT + "/professores/" + id);
    const professor = response.data;

    res.render("editar", { professor });
  } catch (error) {
    console.error("Erro ao buscar detalhes do professor:", error.message);
    res.render("error", { message: "Erro ao buscar detalhes do professor" });
  }
});

// Rota para processar a edição de um professor
app.post("/editar/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { matricula, nome } = req.body;
    // Valide os dados antes de enviar para a API

    await axios.put(API_ENDPOINT + "/professores/" + id, { matricula, nome });

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao editar professor:", error.message);
    res.render("error", { message: "Erro ao editar professor" });
  }
});

// Rota para excluir um professor
app.post("/excluir/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await axios.delete(API_ENDPOINT + "/professores/" + id);

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao excluir professor:", error.message);
    res.render("error", { message: "Erro ao excluir professor" });
  }
});

app.listen(port, () => {
  console.log("Iniciei na porta " + port);
});