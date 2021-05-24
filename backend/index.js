const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const router = require('./src/routes/router');

const app = express();

//TODO cors Options to be defined for Dev/Prod
const corsOptions = {
    origin: `*`,
    optionsSuccessStatus: 200,
    methods: "GET, POST"
};

app.use(cors(corsOptions));
app.use(router);

const port = config.PORT || 8000;
app.listen(port, () => console.log(`App running on port ${port}`));