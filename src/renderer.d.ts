import Game from '../shared/igdbModels/Game';
import Cover from '../shared/igdbModels/Cover';

export interface IElectronAPI {
  getOwnedGames: () => Promise<any[]>;
  getWishedGames: () => Promise<any[]>;
  ownGame: (gameId: number) => Promise<boolean>;
  unOwnGame: (gameId: number) => Promise<boolean>;
  wishGame: (gameId: number) => Promise<boolean>;
  unwishGame: (gameId: number) => Promise<boolean>;
  getGame: (gameId: number) => any;
  playedThroughGame: (gameId: number) => Promise<boolean>;
  notPlayedThroughGame: (gameId: number) => Promise<boolean>;
  getGamesByIds: (gameIds: number[]) => any;
}

export interface ISearchBackend {
  searchGame: (searchTerm: string) => Promise<Game[]>;
}

declare global {
  interface Window {
    electron: IElectronAPI;
    search: ISearchBackend;
  }
}
