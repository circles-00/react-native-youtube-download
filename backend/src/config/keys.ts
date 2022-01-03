const {DB_USER = '',DB_PASSWORD = '', DB_HOST = '', DB_PORT = 5432, DB_DATABASE = ''} = process.env
const port = 5432

const keys = {
    app: {
        name: "backend-react-native-youtube-download"
    },
    db: {
        host: DB_HOST,
        port,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD,
        ssl: true
    },
    jwt: {
        accessToken: {
            expiresIn: '8h',
            cookieMaxAge: 1000 * 60 * 60 * 8 // 8 hours
        },
        refreshToken: {
            expiresIn: "1y",
            cookieMaxAge: 1000 * 60 * 60 * 24 * 30 * 12 // 1 year
        },
        secretOrKey: "sssSecret"
    }
}

export default keys