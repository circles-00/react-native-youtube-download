CREATE TABLE users
(
    id         serial PRIMARY KEY,
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    email      VARCHAR(255),
    password   VARCHAR(255),
    google_id  VARCHAR(255)
);

create TABLE tokens
(
    token_id serial PRIMARY KEY,
    user_id  INTEGER NOT NULL,
    CONSTRAINT fk_users
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE,
    token    TEXT
)
