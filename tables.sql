CREATE TABLE users(
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text UNIQUE NOT NULL,
    "passwordHash" text NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE sessions(
    id serial PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES "users"("id"),
    token text UNIQUE NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE urls(
    id serial PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES "users"("id"),
    "shortUrl" text UNIQUE NOT NULL,
    url text NOT NULL,
    "visitCount" integer NOT NULL DEFAULT 0
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);