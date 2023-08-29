const express = require('express')
const app = express()

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
app.get("/empresas", function (req, res){
  res.send(lista.filter(Boolean));
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