const express = require('express');
const {MongoClient} = require('mongodb');

const url = "mongodb+srv://admin:V90K7ehx2krw7OlM@cluster0.gbnr4oi.mongodb.net";
const dbName = "Backend-Agosto-2023";
const client = new MongoClient(url);

async function main() {
 console.info("Conectando ao banco de dados...");
 await client.connect();
 console.info("Banco de dados conectado com sucesso!");

 const db = client.db(dbName);
 const collection = db.collection("Empresas")

 const app = express();

  //habilitamos o processamento de JSON
  app.use(express.json());

//ENDPOINT PRINCIPAL
app.get('/', function (req, res) {
  res.send('Hello World');
});

//ENDPOINT /oi
app.get('/oi', function (req, res) {
    res.send('API Backend com Nodejs & Express.');
});


//ENDPOINTS DE EMPRESAS
const lista = ["Tribunal Eleitoral","Abitel Telecom","Fiber Network", "Tribunal Eleitoral"];

//READ ALL [GET] /EMPRESAS
app.get("/empresas", async function (req, res){
  const itens = await collection.find().toArray();
  res.send(itens);
});

//CREAT [POST] /EMPRESAS
app.post("/empresas", function (req, res){
//console.log(req.body, typeof req.body);

//Extrair o empresa do Body da request(corpo da requisição)
  const item = req.body.empresa;

//ISERIR O ITEM NA LISTA
lista.push(item);

//Enviamos uma resposta de sucesso
  res.send("Item criado com sucesso!");
});

//Read by ID [GET] /EMPRESAS/:ID
app.get("/empresas/:id", function (req, res){
  //pegamos o parâmetro pelo ID
  const id = req.params.id - 1;

  //pegamos informação da lista
  const item = lista[id];

  res.send(item);
});

//UPDATE [PUT] /EMPRESAS/:ID
app.put("/empresas/:id", function (req, res){
  //Pegamos o parâmetro pelo ID
  const id = req.params.id - 1;

  //Extrai empresa do Body da request(corpo da requisição)
  const item = req.body.empresa;

  //Atualizamos o item da lista registro
  lista[id] = item;

  res.send("Item registrado com sucesso!");
});

// Delete -> [DELETE] /herois/:id
app.delete("/empresas/:id", function (req, res) {
  // Pegamos o parâmetro de rota ID
  const id = req.params.id - 1;

  // Excluir o item da lista
  delete lista[id];

  res.send("Item excluído com sucesso!");
});

app.listen(3000);

}

main();