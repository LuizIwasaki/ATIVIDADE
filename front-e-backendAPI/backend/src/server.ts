import express from "express";
import { AppDataSource } from "./data-source";
var cors = require('cors')
import routes from "./routes";

const PORT = process.env.PORT || 3333;

const app = express();

var corsOptions = {
  origin: 'http://localhost:8100',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use(express.json());

app.use(routes);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT as number, () =>
      console.log(`Listening on all interfaces:${PORT}`)
    );
  })
  .catch((error) => console.log(error));


