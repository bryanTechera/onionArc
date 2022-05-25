import express, { Application } from "express";
import cors from "cors";
import initializeDnaRoutes from "./routes/dna.routes";
import initializeReportRoutes from "./routes/report.routes";
import errorHandler from "./middlewares/errorHandler";
import { Request, Response, NextFunction } from "express";
import { IReportService } from "../../Application/services/ReportService";
import { IDnaService } from "../../Application/services/DnaService";
class Server {
  private app: Application;
  private port: string;
  private dnaService: IDnaService;
  private reportService: IReportService;
  //Direccion de las rutas
  private apiPaths = {
    validate: "/validate-anomaly",
    stats: "/stats",
  };
  constructor(dnaController: IDnaService, reportController: IReportService) {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.dnaService = dnaController;
    this.reportService = reportController;

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    const dnaRouter = initializeDnaRoutes(this.dnaService, this.reportService);
    this.app.use(this.apiPaths.validate, dnaRouter);
    this.app.use(
      this.apiPaths.stats,
      initializeReportRoutes(this.reportService)
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Corriendo en: http://localhost:${this.port}`);
    });
  }
}

export default Server;
