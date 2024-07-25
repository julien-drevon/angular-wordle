import { WordleResultLetter } from "./WordleResultLetter";

export class WordleEngineResult {
  constructor(
    public grid: WordleResultLetter[],
    public essais: number,
    public tailleMotATrouver: number,
    public nombreEssais: number
  ) {}
}
