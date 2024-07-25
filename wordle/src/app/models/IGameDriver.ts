export interface IGameDriver<T> {
  propose(proposeWord: string): T;
  createGame(nbEssais: number): T;
  restart(): T;
}
