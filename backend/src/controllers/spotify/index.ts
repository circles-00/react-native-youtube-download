import SpotifyController from "./SpotifyController";
import {db} from "../../db/db";
import SpotifyService from "../../services/spotify/SpotifyService";

const spotifyService = new SpotifyService(db.spotify)

const spotifyController = new SpotifyController(spotifyService)

export default spotifyController
