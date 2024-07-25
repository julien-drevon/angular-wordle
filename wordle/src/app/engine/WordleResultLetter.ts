import { WordleResultState } from "./WordleResultState";

export class WordleResultLetter {
  constructor(
    public value: string,
    public state: WordleResultState
  ) {
    this.value = value;
    this.state = state;
  }
}
