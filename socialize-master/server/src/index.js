const cors = require('cors');
const express = require('express');
const app = express();

const { connection } = require('./db/connection');
const { UserRouter } = require('./routes/UserRoute');
const { PostRouter } = require('./routes/PostRoute');
const { MessageRoute } = require('./routes/MessageRoute');

app.use(cors())
app.use(express.json());

const port = 8000;
connection();


app.use(UserRouter);
app.use(PostRouter);
app.use(MessageRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
