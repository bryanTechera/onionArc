import { DnaModel } from "../../Domain/dna";
import { DnaDto } from "../dtos/DnaDto";

export interface IDnaService {
  isAnomaly(dna: DnaDto): boolean;
}

export default class DnaService implements IDnaService {
  public isAnomaly(dna: DnaDto): boolean {
    const model = new DnaModel(dna);
    return model.isAnomaly();
  }
}
