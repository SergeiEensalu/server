import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import register from "./handler/register";
import login from "./handler/login";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/register', register);
app.use('/login', login);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
