import { IEndpoint } from '../interfaces/IEndpoint.interface'

const baseUrl = 'http://192.168.1.98:5000'

export const login_endpoint: IEndpoint = {
  path: `${baseUrl}/api/auth/login`,
  method: 'post'
}
