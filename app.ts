import dotenv from "dotenv";
import ReportRepositoryDb from "./Infra/data/repositories/postgress/ReportRepository";
import DnaService from "./Application/services/DnaService";
import ReportService from "./Application/services/ReportService";
import Server from "./Infra/server/server";
import { Pool } from "pg";

dotenv.config();

//dbClient
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE,
  //ssl: { rejectUnauthorized: false },
});

//repositories
const reportRepository = new ReportRepositoryDb(pool);
//Services
const dnaController = new DnaService();
const reportController = new ReportService(reportRepository);

const server = new Server(dnaController, reportController);
server.listen();
