import * as promise from 'bluebird'
import keys from '../config/keys'
import pgPromise from 'pg-promise'
import {IInitOptions, IDatabase, IMain} from 'pg-promise';
import {logger} from "../logger/Logger";
import {createDb, migrate} from "postgres-migrations"
import { IExtensions, UsersRepository } from './repositories';
import SpotifyRepository from "./repositories/SpotifyRepository";

const {db: dbConfig} = keys

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

const initOptions: IInitOptions<IExtensions> = {

    promiseLib: promise,

    extend(obj: ExtendedProtocol, dc: any) {
        obj.users = new UsersRepository(obj, pgp)
        obj.spotify = new SpotifyRepository(obj, pgp)
    }
}

export const pgp: IMain = pgPromise(initOptions)

export const db: ExtendedProtocol = pgp(dbConfig)

const initDb = async (db: ExtendedProtocol, maxTries = 5): Promise<any> => {
    if(maxTries < 0) return
    try {
        await createDb(dbConfig.database, {...dbConfig, defaultDatabase: "postgres"})
    } catch (err) {
        logger.error('Creating db error', err)
    } finally {
        try {
            await migrate(dbConfig, './src/db/migrations/')
        } catch (err) {
            logger.error('Postgres connection error' , err)
            return initDb(db, --maxTries)
        }
    }
}

initDb(db).then(() => {
    logger.info("Postgres connected!")
}).catch(err => {
    logger.error("Init Postgres error", err)
})