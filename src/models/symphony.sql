DROP TABLE IF EXISTS "releases" CASCADE; 
DROP TABLE IF EXISTS "release_genres" CASCADE;
DROP TABLE IF EXISTS "tracks" CASCADE;
DROP TABLE IF EXISTS "genres" CASCADE; 
DROP TABLE IF EXISTS "users" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE "releases" (
  "uid" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "artist" UUID,
  "credits" VARCHAR(500),
  "description" VARCHAR(500),
  "image" BYTEA,
  "max_mints" BIGINT,
  "mint_end" BIGINT,
  "mint_price" NUMERIC(18),
  "mint_start" BIGINT,
  "royalty_percentage" NUMERIC(2),
  "title" VARCHAR(150),
  "release_type" VARCHAR(6),
  "is_deployed" BOOLEAN NOT NULL
);


CREATE TABLE "tracks" (
  "uid" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "release_uid" UUID NOT NULL,
  "file" BYTEA,
  "artist" UUID,
  "title" VARCHAR(150),
  "hidden" BOOLEAN NOT NULL
);

CREATE TABLE "release_genres" (
  "uid" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "release_uid" UUID NOT NULL,
  "genre_uid" UUID NOT NULL
);



CREATE TABLE "genres" (
  "uid" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "name" VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE "users" (
  "uid" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
  "evm_address" VARCHAR(42) NOT NULL UNIQUE,
  "name" VARCHAR(50) NOT NULL UNIQUE
);


ALTER TABLE "tracks" ADD FOREIGN KEY ("uid") REFERENCES "releases" ("uid");

ALTER TABLE "release_genres" ADD FOREIGN KEY ("release_uid") REFERENCES "releases" ("uid");

ALTER TABLE "release_genres" ADD FOREIGN KEY ("genre_uid") REFERENCES "genres" ("uid");

ALTER TABLE "releases" ADD FOREIGN KEY ("artist") REFERENCES "users" ("uid");

ALTER TABLE "tracks" ADD FOREIGN KEY ("artist") REFERENCES "users" ("uid");