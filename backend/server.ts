import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './src/middlewares/logger'

import {errorHandler} from "./src/errors/ErrorHandler";
import appUrlResolver from "./src/middlewares/appUrlResolver";
import cookieToAuthHeader from "./src/middlewares/cookieToAuthHeader";
import cookieParser from "cookie-parser";

const app = new App({
    port: process.env.PORT || 5000,
    controllers: [
        // all controllers go here
    ],
    middleWares: [
        cookieParser(),
        cookieToAuthHeader,
        appUrlResolver,
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}),
        loggerMiddleware
    ],
    errorHandler
})

app.listen()
