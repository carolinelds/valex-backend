import pg, {Pool, PoolConfig} from "pg";
//import dotenv from "dotenv";
//dotenv.config({ path: ".env" });
import "./setup.js";

let chachedDB: Pool;
let connectionParams: PoolConfig = {
};

export default async function connectDB(): Promise<Pool> {
  if (chachedDB) {
    return chachedDB;
  }

  if (process.env.DATABASE_URL) {
    connectionParams = {
      connectionString: process.env.DATABASE_URL,
    };
  }

  if (process.env.MODE === "PROD") {
    connectionParams.ssl = {
      rejectUnauthorized: false,
    };
  }

  const { Pool } = pg;

  const connection = new Pool(connectionParams);

  await connection.connect();

  chachedDB = connection;

  return connection;
}