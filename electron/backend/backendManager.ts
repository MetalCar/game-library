import gameCommands from "./gameCommands";
import searchCommands from "./searchCommands";

const backendManager = (ipcMain: Electron.IpcMain) => {
  gameCommands(ipcMain);
  searchCommands(ipcMain);
};

export default backendManager;
