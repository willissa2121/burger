var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
}
else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Passwordsucks!1",
    database: "PRACTICE_DB"
  });
}

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});


app.get('/', (req, res) => {
  let eaten = []
  let notEaten = []
  let query = connection.query('SELECT * FROM practice', (err, data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].eaten === 0) {
        eaten.push(data[i])
      }
      else {
        notEaten.push(data[i])
      }
    }
    res.render('index', {
      list1: eaten,
      list2: notEaten
    })
  })
})

app.post('/', (req, res) => {
  let query = connection.query('INSERT INTO practice(burger,eaten)VALUES(?,?)', [req.body.example, 0], (err, data) => {
    if (err) throw err;
    res.redirect('/')
  })

  // let query = connection.query('')
})


app.delete('/api/:id', (req, res) => {
  let delId = req.params.id;
  connection.query('UPDATE PRACTICE SET eaten = true WHERE id=?', [delId], (err, data) => {
    if (err) throw err;
    res.render('index', data)
  })
})


app.put('/api/:id/:text', (req, res) => {
  let id = req.params.id
  let text = req.params.text;
  connection.query('UPDATE practice set burger = ? WHERE id=?', [text, id], (err, data) => {
    if (err) throw err;
    res.render('index', data)
  })
})

app.post('/api/remake/:id', (req, res) => {
  let id = req.params.id
  console.log(id)
  connection.query('UPDATE practice SET eaten = 0 WHERE id=?', [id], (err, data) => {
    if (err) throw err;
    res.render('index', data)

  })
})

app.listen(PORT, () => {
  console.log('listening in on port ' + PORT)
})