import passportJwt from 'passport-jwt'
import keys from '../config/keys'
import {db} from "../db/db";

const {users: usersRepository} = db

export const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt.secretOrKey
};

export default (passport: any) => {
    passport.use(
        new passportJwt.Strategy(jwtOptions, async (payload, done) => {
            const user = await usersRepository.findByEmail(payload.email);
            if (user) {
                return done(null, payload);
            }
            return done(null, null);
        })
    );
};
