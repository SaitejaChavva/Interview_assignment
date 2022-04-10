/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connect } from './configs/mongoConn'
import routes from './routes';
import * as bodyParser from 'body-parser';
import * as i18n from 'i18n';
import morgan from "morgan";
import * as Authentication from './configs/authentication'
// require()

i18n.configure({
    locales: ['responseMessages'],
    directory: __dirname + '/utils',
    defaultLocale: 'responseMessages',
});

connect();
// dummyData;
/** If there is no users exists in the DB, then, a default user will be created whenever the server starts **/
Authentication.isUserExists()
dotenv.config();
/** App Variables **/
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/** Configuring the App **/
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(routes);

/** Starting the Server **/
app.listen(PORT, () => {
    console.log(`Server started running on the port ${PORT}`);
});
