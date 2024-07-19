import { WordleState } from "./wordleState";

export class WordleLetter {
  constructor(public value: string, public state: WordleState) {
    this.value = value;
    this.state = state;
  }
}
