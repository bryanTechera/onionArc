import { IReportRepository } from "../repositories/IReportRepository";
import SummaryReport, { ISummaryReport } from "../../Domain/summary";
import { ReportDto } from "../dtos/ReportDto";

export interface IReportService {
  getSummaryReport(): Promise<ISummaryReport>;
  createReportWithAnomaly(): Promise<ReportDto>;
  createReportWhitoutAnomaly(): Promise<ReportDto>;
}

export default class ReportService implements IReportService {
  constructor(private repository: IReportRepository) {}

  async getSummaryReport(): Promise<ISummaryReport> {
    const countWithAnomaly = await this.getCountWithAnomaly();
    const countWithoutAnomaly = await this.getCountWithoutAnomaly();

    const sumary = new SummaryReport(countWithAnomaly, countWithoutAnomaly);
    return sumary;
  }

  private async getCountWithAnomaly() {
    const withAnomaly = await this.repository.getReporsWithAnomaly();
    const totalWithAnomaly = withAnomaly.length;
    return totalWithAnomaly;
  }

  private async getCountWithoutAnomaly() {
    const withtoutAnomaly = await this.repository.getReportsWhitoutAnomaly();
    const totalWithoutAnomaly = withtoutAnomaly.length;
    return totalWithoutAnomaly;
  }
  async createReportWithAnomaly(): Promise<ReportDto> {
    const report: ReportDto = { hasAnomaly: true };
    const reportCreated = await this.repository.create(report);
    return reportCreated;
  }

  async createReportWhitoutAnomaly(): Promise<ReportDto> {
    const report: ReportDto = { hasAnomaly: false };
    const reportCreated = await this.repository.create(report);
    return reportCreated;
  }
}
