import 'reflect-metadata';
import { DataSource } from 'typeorm';
import getAppDataPath from 'appdata-path';
import { Game } from './models/Game';

class Database {
  static instance: Database | null = null;
  private db;

  constructor() {
    this.db = new DataSource({
      type: 'sqlite',
      database: getAppDataPath('game-library') + '/db.sqlite3',
      entities: [Game],
      synchronize: true,
      logging: true,
    });
  }

  static getInstance(): Database {
    if (Database.instance === null) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  get DB() {
    return this.db;
  }

  get Games() {
    return this.db.getRepository(Game);
  }
}

export default Database;
