import { ReportDto } from "../dtos/ReportDto";

export interface IReportRepository {
  getReporsWithAnomaly(): Promise<ReportDto[]>;
  getReportsWhitoutAnomaly(): Promise<ReportDto[]>;
  create(result: ReportDto): Promise<ReportDto>;
}
