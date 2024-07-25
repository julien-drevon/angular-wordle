import { WordleGameResult } from "../models/WordleGameResult";
import { WordleAbstractPresenter } from "./WordleAbstractPresenter";

export class WordleDefaultPresenter extends WordleAbstractPresenter<WordleGameResult> {
  public override convertTinToWordleGameResult(
    result: WordleGameResult
  ): WordleGameResult {
    return converterForFakePresenter(result);
  }
}
export const converterForFakePresenter = (data: WordleGameResult) => data;

export const createFakePresenter = () => new WordleDefaultPresenter();