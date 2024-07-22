import { WordleLine } from "./WordleLine";

export class WordleGameResult {
  public data: WordleLine[] = [];
  public motATrouver = "";
  public nombreEssais = 5;
  public actualEssais = 0;
}
