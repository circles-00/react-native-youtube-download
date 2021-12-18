import IEndpoint from "./IEndpoint.interface";

interface IControllerBase {
    readonly basePath: string,
    initRoutes(): any,
    endpoints: Array<IEndpoint>
}

export default IControllerBase
