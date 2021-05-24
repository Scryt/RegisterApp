const fs = require("fs");
const {runQuery} = require('../db.js')
const path = require('path');

const databaseCreate = fs.readFileSync(path.join(__dirname, '/database_create.sql')).toString();

runQuery(databaseCreate);