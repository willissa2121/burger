var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Passwordsucks!1",
  database: "PRACTICE_DB"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});


app.get('/', (req, res) => {
  let query = connection.query('SELECT * FROM practice', (err, data) => {
    res.render('index', { list: data })
  })
})

app.post('/', (req, res) => {
  let query = connection.query('INSERT INTO practice(burger,eaten)VALUES(?,?)', [req.body.example, 'no'], (err, data) => {
    if (err) throw err;
    res.redirect('/')
  })

  // let query = connection.query('')
})


app.delete('/api/:id', (req, res) => {
  let delId = req.params.id;
  connection.query('DELETE FROM practice WHERE id=?', [delId], (err, data) => {
    if (err) throw err;
    res.render('index', data)
  })
})


app.put('/api/:id/:text', (req, res) => {
  let id = req.params.id
  let text = req.params.text;
  console.log(req.params)
  connection.query('UPDATE practice set burger = ? WHERE id=?', [text, id], (err, data) => {
    if (err) throw err;
    res.render('index', data)
  })
})

app.listen(3000, () => {
  console.log('listening in on port 3k')
})