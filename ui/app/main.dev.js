/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Set up Python process
 */
const fs = require('fs');
const path = require('path')
const findProcess = require('find-process');
const PY_DIST_FOLDER = 'appdist'
const PY_FOLDER = 'app'
const PY_MODULE = 'mtgatracker_backend' // without .py suffix
const no_server = false;

let pyProc = null
let pyPort = null

let appDataRoaming = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local')
let logPath = path.join(appDataRoaming, "..", "LocalLow", "Wizards Of The Coast", "MTGA", "output_log.txt");

const guessPackaged = () => {
  const fullPath = path.join(__dirname, "..", PY_DIST_FOLDER)
  return fs.existsSync(fullPath)
}

const getScriptPath = () => {
  if (!guessPackaged()) {
    return path.join(__dirname, "..", "..", PY_FOLDER, PY_MODULE + '.py')
  }
  if (process.platform === 'win32') {
    return path.join(__dirname, PY_FOLDER, PY_MODULE, PY_MODULE + '.exe') // TODO: verify this
  }
  return path.join(__dirname, PY_FOLDER, PY_MODULE, PY_MODULE)
}

const getPyBinPath = () => {
  if (process.platform === 'win32') {
    let venv_path_win = path.join(__dirname, "..", "..", "venv", "Scripts", "python.exe")
    let venv_path_x = path.join(__dirname, "..", "..", "venv", "Scripts", "python")
    let fallback_path = "python"
    if (fs.existsSync(venv_path_win)) {
        return venv_path_win
    } else if (fs.existsSync(venv_path_x)) {
        return venv_path_x
    } else {
        return fallback_path // ? shrug
    }
  }
}

const selectPort = () => {
  pyPort = 5678
  return pyPort
}

let port = selectPort()
global.port = port;

const generateArgs = () => {
    var args = ["-p", port]
    args.push("-i")
    args.push(logPath)
    if (false) {
        args.push('-nf')
    }
    if (false) {
        args.push('-f')
    }
    if (false) {
      args.push('-m')
    }
    return args
}

const cleanupPyProc = (cb)  => {
    let finishedCount = 0;
    let p1 = findProcess('name', "mtgatracker_backend.exe")
    let p2 = findProcess('port', 5678)
    Promise.all([p1, p2]).then(function(vals) {
        let nameList = vals[0]
        let portList = vals[1]
        let killedList = []
        nameList.forEach(function(proc) {
            if (proc.pid != 0 && !killedList.includes(proc.pid)) {
                console.log("leftover python process (name) @ " + proc.pid + ", killing...")
                process.kill(proc.pid)
                killedList.push(proc.pid)
            }
        })
        portList.forEach(function(proc) {
            if (proc.pid != 0 && !killedList.includes(proc.pid)) {
                console.log("leftover python process (port) @ " + proc.pid + ", killing...")
                process.kill(proc.pid)
                killedList.push(proc.pid)
            }
        })
      cb()
    })

}

let server_killed = false

const createPyProc = () => {
  let script = getScriptPath()
  let pbPath = getPyBinPath()

  let args = generateArgs()
  if (guessPackaged()) {
    try {
      mainWindow.webContents.send('stdout', {text: `calling: spawn(${script}, ${args}}`})
    } catch (error) {
      console.log("couldn't send stdout message to main window, likely already destroyed")
    }
    pyProc = require('child_process').spawn(script, args)
  } else {
    let pbArgs = ['-u', script].concat(args)  // -u for unbuffered python
    try {
      mainWindow.webContents.send('stdout', {text: `calling: spawn(${pbPath}, ${pbArgs})`})
    } catch (error) {
      console.log("couldn't send stdout message to main window, likely already destroyed")
    }
    pyProc = require('child_process').spawn(pbPath, pbArgs)
  }

  if (pyProc != null) {
    console.log('child process success on port ' + port)
    pyProc.stderr.on('data', function(data) {
      console.log("py stderr: " + data.toString());
      if (mainWindow) {
        try {
          mainWindow.webContents.send('stdout', {text: "py stderr:" + data.toString()})
        } catch (error) {
          console.log("couldn't send stdout message to main window, likely already destroyed")
        }
      }
    });
    pyProc.stdout.on('data', function(data) {
      console.log("py stdout:" + data.toString());
      if (mainWindow) {
        try {
          mainWindow.webContents.send('stdout', {text: "py stdout:" + data.toString()})
        } catch (error) {
          console.log("couldn't send stdout message to main window, likely already destroyed")
        }
      }
    });
    pyProc.on('exit', function(code) {
      console.log(`python exited with code ${code}`);
      server_killed = true;
    });
  }
}

if (!no_server) {
    cleanupPyProc(createPyProc)
}

/**
 * Add event listeners...
 */
function freeze(time) {
    const stop = new Date().getTime() + time;
    while(new Date().getTime() < stop);
}
let kill_server = true
const killServer = () => {
    console.log("killServer called")
    if (!server_killed && kill_server) {
        server_killed = true;
        if (!no_server) {
            console.log("cleaning up")
            freeze(2000)
            cleanupPyProc(() => {})
        }
        pyProc = null
        pyPort = null
    }
    if (global.updateReady) {
      console.log("doing quitAndInstall")
      updater.install()
    } else {
      console.log("app.quit()")
      app.quit()
    }
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
    killServer();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});
