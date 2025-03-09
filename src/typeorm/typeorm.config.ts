import { DataSource } from "typeorm";
import { User } from "../entities/User"; 
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "UserAcc.db",
    entities: [User], 
    synchronize: true,
    logging: true,
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
    extra: {
      connectionLimit: 1,
    },
  });
  
  AppDataSource.initialize()
    .then(() => {
      console.log("Database connected successfully");
      AppDataSource.query("PRAGMA journal_mode = WAL;"); 
    })
    .catch((error) => console.error("Error connecting to the database:", error));
