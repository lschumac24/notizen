import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import hbs from 'hbs';
hbs.registerHelper('equal', require('handlebars-helper-equal'));

const notesRoutes = require('./routes/notesRoutes')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('vew engine', 'hbs');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname), 'public'));
app.use(notesRoutes);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;