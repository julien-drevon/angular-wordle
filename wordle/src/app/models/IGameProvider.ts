export interface IGameProvider {
  createGame(mot: string, nbEssais: number): void;
}
