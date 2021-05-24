const sqlite3 = require("sqlite3");
const path = require('path');

// db connection is started and closed for each query run as it does not matter to much for "single user app" using sqlite db
//TODO open connections when app is running and sclose after it finishes all the query and app has been closed (or idle for n min)
dbOpenConnection = () => {
    return new sqlite3.Database(path.join(__dirname, 'database'), err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connection started")
    })
}

dbCloseConnection = (db) => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connection closed")
    });
}

runQuery = (query, params) => {
    const db = dbOpenConnection();

    console.log(query);

    db.serialize(() => {
        db.run("BEGIN TRANSACTION;");
        db.run(query, params, (err) => {
            if (err) throw err;
        });
        db.run("COMMIT;");
    });

    dbCloseConnection(db);

    return {status: "ok"};
};

runSelectQuery = async (query, params) => {
    const db = dbOpenConnection()
    const results = await new Promise((resolve, reject) => db.all(query, params, (err, results) => {
        if (err) {
            reject(err)
        } else {
            resolve(results)
        }
    }))

    dbCloseConnection(db);
    return results
}

module.exports = {
    runQuery,
    runSelectQuery
}