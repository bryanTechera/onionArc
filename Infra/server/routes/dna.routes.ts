import { Router } from "express";
import { IDnaService } from "../../../Application/services/DnaService";
import { IReportService } from "../../../Application/services/ReportService";
import errorHandler from "../middlewares/errorHandler";
import { dnaValidationHandler } from "./handdlers/dnaValidationHandler";

export default function initializeDnaRoutes(
  dnaService: IDnaService,
  reportService: IReportService
): Router {
  const router = Router();

  router.post("/", dnaValidationHandler(dnaService, reportService));

  router.use(errorHandler);

  return router;
}
