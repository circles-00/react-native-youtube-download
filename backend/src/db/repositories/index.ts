import UsersRepository from "./UsersRepository";
import SpotifyRepository from "./SpotifyRepository";

interface IExtensions {
    users: UsersRepository
    spotify: SpotifyRepository
}

export {
    IExtensions,
    UsersRepository,
    SpotifyRepository
};