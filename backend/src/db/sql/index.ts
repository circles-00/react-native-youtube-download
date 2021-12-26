import {QueryFile, IQueryFileOptions} from 'pg-promise';

const {join: joinPath} = require('path');

export const users = {
    findByEmail: sql('users/findByEmail.sql'),
    createUser: sql('users/createUser.sql')
}

export const spotify = {
    /// ...
}

function sql(file: string): QueryFile {

    const fullPath: string = joinPath(__dirname, file)

    const options: IQueryFileOptions = {
        minify: true
    }

    const qf: QueryFile = new QueryFile(fullPath, options)

    if (qf.error) {
        console.error(qf.error)
    }
    return qf
}