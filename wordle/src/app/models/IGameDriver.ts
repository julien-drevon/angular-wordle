export interface IGameDriver<T> {
  propose(proposeWord: string): T;
  createGame(nbEssais: number): T;
  restart(): T;
}

export interface IMOutPresenter<TOut> {
  view(): PresentData<TOut>;
}

export interface PresentData<Tout> {
  data: Tout;
  error: string;
}
