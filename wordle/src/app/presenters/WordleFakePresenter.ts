import { IMOutPresenter } from "../clean-archi/IMOutPresenter";
import { PresentData } from "../clean-archi/PresentData";
import { WordleGameResult } from "../models/WordleGameResult";
import { createStartGille } from "./WordleAbstractPresenter";


export class WordleFakePresenter implements IMOutPresenter<WordleGameResult> {
    _result: WordleGameResult = {
        data: [],
        lengthOfWord: 5,
        nombreEssais: 0,
        actualEssais: 0
    };

    _resultToDisplay: WordleGameResult = {
        data: [],
        lengthOfWord: 5,
        nombreEssais: 0,
        actualEssais: 0
    };

    view(): PresentData<WordleGameResult> {
        this.assignGrid();
        this.assignOtherResult();
        return { data: this._resultToDisplay, error: "" };
    }

    private assignGrid() {
        if (this._result.actualEssais < 1) {
            this._resultToDisplay.data = createStartGille(this._result);
        } else {
            const index = this._result.actualEssais - 1;
            this._resultToDisplay.data[index] = this._result.data[index];
        }
    }

    private assignOtherResult() {
        this._resultToDisplay.actualEssais = this._result.actualEssais;
        this._resultToDisplay.lengthOfWord = this._result.lengthOfWord;
        this._resultToDisplay.nombreEssais = this._result.nombreEssais;
    }

    public presentData(result: WordleGameResult): void {
        this._result = result;
    }
}
