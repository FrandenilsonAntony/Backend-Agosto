const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');

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
  res.send("Hello World");
});

//ENDPOINT /oi
app.get("/oi", function (req, res) {
    res.send("API Backend com Nodejs & Express.");
});


//ENDPOINTS DE EMPRESAS
const lista = ["Tribunal Eleitoral","Abitel Telecom","Fiber Network", "Tribunal Eleitoral"];

//READ ALL [GET] /EMPRESAS
app.get("/empresas", async function (req, res){
  const itens = await collection.find().toArray();
  res.send(itens);
});

//CREAT [POST] /EMPRESAS
app.post("/empresas", async function (req, res){
//console.log(req.body, typeof req.body);

//Extrair o empresa do Body da request(corpo da requisição)
  const item = req.body;

//Iseri o item da collection
await collection.insertOne(item);

//Enviamos uma resposta de sucesso
  res.status(201).send(item);
});

//Read by ID [GET] /EMPRESAS/:ID
app.get("/empresas/:id", async function (req, res){
  //pegamos o parâmetro pelo ID
  const id = req.params.id;

  //pegamos informação da collection
  const item = await collection.findOne ({
    _id: new ObjectId(id),
  });
//Exibimos o item na resposta do endpoint
  res.send(item);
});

//UPDATE [PUT] /EMPRESAS/:ID
app.put("/empresas/:id", async function (req, res){
  //Pegamos o parâmetro pelo ID
  const id = req.params.id;

  //Extrai o nome do Body da request(corpo da requisição)
  const item = req.body;

  //Atualizamos a informação na collection
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: item });

  res.send(item);
});

// Delete -> [DELETE] /herois/:id
app.delete("/empresas/:id", async function (req, res) {
  // Pegamos o parâmetro de rota ID
  const id = req.params.id;

  // Excluir o item da collection
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: item });

  res.status(204).send();
});

app.listen(3000);

}

main();