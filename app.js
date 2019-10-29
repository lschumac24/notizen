import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import hbs from 'express-hbs';
import {notesRoutes} from "./routes/notesRoutes";
import {registerHelpers} from "./utils/handlebar-utils";
import {overrideMiddleware} from "./utils/method-override";

const app = express();
app.engine('hbs', hbs.express4());
app.set('vew engine', 'hbs');
app.set('views', path.resolve('views'));
registerHelpers(hbs);

const router = express.Router();

app.use(express.static(path.resolve('public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(overrideMiddleware);

app.use("/", notesRoutes);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;