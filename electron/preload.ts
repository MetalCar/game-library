import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getOwnedGames: () => ipcRenderer.invoke('getOwnedGames'),
  getWishedGames: () => ipcRenderer.invoke('getWishedGames'),
  ownGame: (gameId: number) => ipcRenderer.invoke('ownGame', gameId),
  unOwnGame: (gameId: number) => ipcRenderer.invoke('unOwnGame', gameId),
  wishGame: (gameId: number) => ipcRenderer.invoke('wishGame', gameId),
  unwishGame: (gameId: number) => ipcRenderer.invoke('unwishGame', gameId),
  getGame: (gameId: number) => ipcRenderer.invoke('getGame', gameId),
  playedThroughGame: (gameId: number) => ipcRenderer.invoke('playedThroughGame', gameId),
  notPlayedThroughGame: (gameId: number) => ipcRenderer.invoke('notPlayedThroughGame', gameId),
  getGamesByIds: (gameIds: number[]) => ipcRenderer.invoke('getGamesByIds', gameIds),
});

contextBridge.exposeInMainWorld('search', {
  searchGame: (searchTerm: string) => ipcRenderer.invoke('searchGame', searchTerm),
});
