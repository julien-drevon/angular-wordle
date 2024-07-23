import { WordleLine } from "./WordleLine";

export class WordleGameResult {
  public data: WordleLine[] = [];
  public lengthOfWord = 5;
  public nombreEssais = 5;
  public actualEssais = 0;
}
