import { IEndpoint } from '../interfaces/IEndpoint.interface'

const baseUrl = 'https://yt-download-backend.herokuapp.com'

export const login_endpoint: IEndpoint = {
  path: `${baseUrl}/api/auth/login`,
  method: 'post'
}

export const spotify_categories_endpoint: IEndpoint = {
  path: `${baseUrl}/api/spotify/categories`,
  method: 'get'
}