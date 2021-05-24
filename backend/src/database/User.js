const {runQuery, runSelectQuery} = require('./db')

userExists = async (login) => {
    const params = {
        "$login": login
    }

    let query = `SELECT id
                 FROM Users
                 WHERE login = $login`

    const results = await runSelectQuery(query, params)

    return results.length > 0;
}

addUser = async (login, password) => {
    const params = {
        "$login": login,
        "$password": password
    }

    console.log(login)

    if(await userExists(login)) {
        console.log(5)
        return
    }

    let query = `INSERT INTO Users (login, password)
                 VALUES ($login, $password)`

    return runQuery(query, params);
}

module.exports = {
    userExists,
    addUser
}