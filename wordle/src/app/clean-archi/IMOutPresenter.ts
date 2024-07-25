import { PresentData } from "./PresentData";

export interface IMOutPresenter<TOut> {
  view(): PresentData<TOut>;
}
