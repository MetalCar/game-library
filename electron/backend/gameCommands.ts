import { DataSource } from 'typeorm';
import Database from '../database/database';
import { Game } from '../database/models/Game';

const gameCommands = (ipcMain: Electron.IpcMain) => {
  let database = Database.getInstance();
  database.DB.initialize().then((dataSource: DataSource) => {
    ipcMain.handle('wishGame', async (event, gameId: number): Promise<boolean> => {
      let game = await database.Games.findOne({
        where: { gameId: gameId },
      });

      if (game === null) {
        game = new Game();
        game.gameId = gameId;
      }

      game.isOnWishlist = true;
      await database.Games.save(game);

      return true;
    });

    ipcMain.handle('unwishGame', async (event, gameId: number): Promise<boolean> => {
      let game = await database.Games.findOne({
        where: { gameId: gameId },
      });

      if (game === null) {
        game = new Game();
        game.gameId = gameId;
      }

      game.isOnWishlist = false;
      await database.Games.save(game);

      return true;
    });

    ipcMain.handle('ownGame', async (event, gameId: number): Promise<boolean> => {
      let game = await database.Games.findOne({
        where: { gameId: gameId },
      });

      if (game === null) {
        game = new Game();
        game.gameId = gameId;
      }

      game.isInLibrary = true;
      await database.Games.save(game);

      return true;
    });

    ipcMain.handle('unOwnGame', async (event, gameId: number): Promise<boolean> => {
      let game = await database.Games.findOne({
        where: { gameId: gameId },
      });

      if (game === null) {
        game = new Game();
        game.gameId = gameId;
      }

      game.isInLibrary = false;
      await database.Games.save(game);

      return true;
    });

    ipcMain.handle('getGame', async (event, gameId: number): Promise<any> => {
      let game = await database.Games.findOne({
        where: { gameId: gameId },
      });

      return game ?? null;
    });

    ipcMain.handle('getOwnedGames', async (event): Promise<any[]> => {
      let ownedGames = await database.Games.find({
        where: { isInLibrary: true },
      });

      return ownedGames;
    });

    ipcMain.handle('getWishedGames', async (event): Promise<any[]> => {
      let wishedGames = await database.Games.find({
        where: { isOnWishlist: true },
      });

      return wishedGames;
    });

    ipcMain.handle('playedThroughGame', async (event, gameId: number): Promise<boolean> => {
      let game = await database.Games.findOne({
        where: { gameId: gameId },
      });

      if (game === null) {
        game = new Game();
        game.gameId = gameId;
      }

      game.isPlayedThrough = true;
      await database.Games.save(game);

      return true;
    });

    ipcMain.handle('notPlayedThroughGame', async (event, gameId: number): Promise<boolean> => {
      let game = await database.Games.findOne({
        where: { gameId: gameId },
      });

      if (game === null) {
        game = new Game();
        game.gameId = gameId;
      }

      game.isPlayedThrough = false;
      await database.Games.save(game);

      return true;
    });
  });
};

export default gameCommands;
