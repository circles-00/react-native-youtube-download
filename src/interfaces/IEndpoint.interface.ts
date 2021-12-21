type HTTPMethod = 'get' | 'post' | 'put' | 'delete'

export interface IEndpoint {
  path: string
  method: HTTPMethod
}
