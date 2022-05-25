import { NextFunction, Request, Response } from "express";
import { IDnaService } from "../../../../Application/services/DnaService";
import { IReportService } from "../../../../Application/services/ReportService";

export const dnaValidationHandler = (
  dnaService: IDnaService,
  reportService: IReportService
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { dna } = req.body;
      let statusCode: number;
      const isAnomaly = dnaService.isAnomaly(dna);

      if (isAnomaly) {
        statusCode = 200;
        reportService.createReportWithAnomaly();
      } else {
        statusCode = 403;
        reportService.createReportWhitoutAnomaly();
      }
      res.status(statusCode).json({});
    } catch (error) {
      next(error);
    }
  };
};
