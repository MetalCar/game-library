import apicalypseFactory from 'apicalypse';
import Api from '../api/api';
import Game from '../../shared/igdbModels/Game';

const searchCommands = (ipcMain: Electron.IpcMain) => {
  let api = Api.getInstance();

  ipcMain.handle('searchGame', async (event, searchTerm: string): Promise<Game[]> => {
    if (api.Options) {
      const response = await apicalypseFactory(api.Options)
        .fields('name, cover.image_id, platforms.name, platforms.platform_logo.url, alternative_names.name, alternative_names.comment')
        .search(searchTerm)
        .limit(100)
        .request('/games');

      return response.data;
    }

    return [];
  });

  ipcMain.handle('getGamesByIds', async (event, gameIds: number[]): Promise<any> => {
    if (api.Options) {
      const response = await apicalypseFactory(api.Options)
        .fields('name, cover.image_id, platforms.name, platforms.platform_logo.url, alternative_names.name, alternative_names.comment')
        .where(`id = (${gameIds.join(',')})`)
        .limit(100)
        .request('/games');

      return response.data;
    }

    return [];
  });
};

export default searchCommands;
