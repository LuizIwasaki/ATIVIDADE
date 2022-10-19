import "reflect-metadata";
import { DataSource } from "typeorm";

import { createUser1663943193093 } from "./database/migrations/1663943193093-create_user";
import { CreatePostTable1665152078057 } from "./database/migrations/1665152078057-CreatePostTable";
import { CreateImageTable1665152727793 } from "./database/migrations/1665152727793-CreateImageTable";

import Image from "./models/Image";
import Post from "./models/Post";
import User from "./models/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "db_aula",
  synchronize: false,
  logging: false,
  entities: [User, Post, Image],
  migrations: [
    createUser1663943193093,
    CreatePostTable1665152078057,
    CreateImageTable1665152727793,
  ],
  subscribers: [],
});
