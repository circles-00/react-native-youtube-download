import { AxiosInstance } from "axios";

export interface ISpotifyCatalogs {
  handleError: (err: any, cb: (numOfTries: number) => Promise<void>, numOfTries: number) => void
  axiosInstance?: AxiosInstance
}