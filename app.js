import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import hbs from 'express-hbs';
import {notesRoutes} from "./routes/notesRoutes";
import {registerHelpers} from "./utils/handlebar-utils";
import {overrideMiddleware} from "./utils/method-override";

const app = express();

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.express4());

registerHelpers(hbs);

const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

app.use(bodyParser.json());
app.use(overrideMiddleware);
app.use(notesRoutes);
//app.use("/", notesRoutes);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;