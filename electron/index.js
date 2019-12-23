const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron
const puppeteer = require('puppeteer-electron')

let win

async function createWindow() {
    
    win = new BrowserWindow({
        width: 800, height: 600, webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadURL(`file://${__dirname}/index.html`)

    win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
}

// 이 메서드는 Electron의 초기화가 끝나면 실행되며 브라우저
// 윈도우를 생성할 수 있습니다. 몇몇 API는 이 이벤트 이후에만
// 사용할 수 있습니다.
app.on('ready', () => {
    createWindow;

})
if (!app.isReady()) {
    const {main} = require('./js/remote')
}

// 모든 창이 닫히면 애플리케이션 종료.
app.on('window-all-closed', () => {
    // macOS의 대부분의 애플리케이션은 유저가 Cmd + Q 커맨드로 확실하게
    // 종료하기 전까지 메뉴바에 남아 계속 실행됩니다.
})

// 이 파일엔 제작할 애플리케이션에 특화된 메인 프로세스 코드를
// 포함할 수 있습니다. 또한 파일을 분리하여 require하는 방법으로
// 코드를 작성할 수도 있습니다.
ipcMain.on('openFile', async (event, arg) => {
})
