import { Router } from "express";
import { IReportService } from "../../../Application/services/ReportService";
import errorHandler from "../middlewares/errorHandler";

export default function initializeReportRoutes(
  dnaService: IReportService
): Router {
  const router = Router();

  router.get("/", async (_, res, next) => {
    try {
      const sumary = await dnaService.getSummaryReport();
      res.json(sumary);
    } catch (error) {
      next(error);
    }
  });

  router.use(errorHandler);
  return router;
}
