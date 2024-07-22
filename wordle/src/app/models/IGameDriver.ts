export interface IGameDriver<T> {
  propose<T>(proposeWord: string): T;
  createGame(mot: string, nbEssais: number): T;
}

export interface IMOutPresenter<TOut> {
  view(): PresentData<TOut>;
}

export interface PresentData<Tout> {
  data: Tout;
  error: string;
}
