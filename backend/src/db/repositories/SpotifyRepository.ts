import { ISpotifyRepository } from "../../interfaces/repositories/ISpotifyRepository.interface";
import { IDatabase, IMain } from "pg-promise";

class SpotifyRepository implements ISpotifyRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {
  }
}

export = SpotifyRepository