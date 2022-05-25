import { Pool } from "pg";
import { ReportDto } from "../../../../Application/dtos/ReportDto";
import { IReportRepository } from "../../../../Application/repositories/IReportRepository";

export default class ReportRepositoryDb implements IReportRepository {
  private dbClient;
  constructor(dbClient: Pool) {
    this.dbClient = dbClient;
  }

  async getReporsWithAnomaly(): Promise<ReportDto[]> {
    const reportsData = await this.dbClient.query(
      "select hasAnomaly from reports where hasAnomaly=true"
    );
    return reportsData.rows;
  }

  async getReportsWhitoutAnomaly(): Promise<ReportDto[]> {
    const reportsData = await this.dbClient.query(
      "select hasAnomaly from reports where hasAnomaly=false"
    );
    return reportsData.rows;
  }

  async create(report: ReportDto): Promise<ReportDto> {
    await this.dbClient.query("insert into reports(hasanomaly) values($1)", [
      String(report.hasAnomaly),
    ]);
    return report;
  }
}
