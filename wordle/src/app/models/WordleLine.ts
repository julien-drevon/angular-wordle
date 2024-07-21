import { WordleLetter } from "./WordleLetter";
import { WordleState } from "./wordleState";


export class WordleLine {
    constructor(private _letters: WordleLetter[] = []) { }

    public setLetters(value: WordleLetter[]) {
        this._letters = value;
    }

    public get letters(): WordleLetter[] {
        return this._letters;
    }

    public isGoodWord(): boolean {
        if (this._letters)
            return this._letters.every((x) => x.state == WordleState.good);

        return false;
    }
}
