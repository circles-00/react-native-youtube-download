import express, {Request, Response} from 'express'
import {Application} from 'express'
import path from 'path'
import IErrorHandlerInterface from "./src/interfaces/IErrorHandler.interface";
import {logger} from "./src/logger/Logger";
import passport from "passport";
import jwtMiddleware from './src/middlewares/jwt'

class App {
    public app: Application
    public port: number | string
    public logger: any

    constructor(private appInit: { port: number | string; middleWares: any; controllers: any; logger?: any, errorHandler: IErrorHandlerInterface }) {
        this.app = express()
        this.port = appInit.port
        this.logger = appInit.logger || logger
        passport.serializeUser((user: any, done: (success: boolean | null, user: any) => any) => {
            done(null, user)
        })

        jwtMiddleware(passport)
        this.middleWares(appInit.middleWares)
        this.routes(appInit.controllers)
        this.errorHandlerMiddleware(appInit.errorHandler.handleError)
        // this.serveStaticContent()
        this.listenForErrors()
    }

    private middleWares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    private errorHandlerMiddleware(errorHandler: any) {
        this.app.use(errorHandler)
    }

    // public serveStaticContent() {
    //     this.app.use(express.static(path.join(__dirname, "client/build")));
    //
    //     this.app.get("/*", (req: Request, res: Response) => {
    //         res.sendFile(path.join(__dirname, "client/build/index.html"), function (err) {
    //             if (err) {
    //                 res.status(500).send(err.message);
    //             }
    //         });
    //     });
    // }

    public listenForErrors() {
        process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
            this.logger.info("Unhandled rejection")
            throw reason;
        });

        process.on('uncaughtException', (error: Error) => {
            this.appInit.errorHandler.handleError(error);
            if (!this.appInit.errorHandler.isTrustedError(error)) {
                process.exit(1);
            }
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            this.logger.info(`App listening on port ${this.port}!`)
        })
    }
}

export default App