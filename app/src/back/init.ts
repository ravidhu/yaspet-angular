// Basic init
const path = require('path')
const electron = require('electron')

const {app, BrowserWindow} = electron

import { myCustomSum } from './library/calculate'

const rootPath = path.resolve('./')
const buildPath = path.join(rootPath, 'app', 'build')

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(buildPath, {
    electron: path.join(rootPath, 'node_modules', '.bin', 'electron'),
    hardResetMethod : 'exit'
})

let mainWindow: any


const windowFactory = () => {

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        // frame:false
    })


    if (process.env.NODE_ENV) {

      console.log('DEV MODE')

      const url = 'http://localhost:4200'
      const request = require('request')
      const timeoutInMilliseconds = 10 * 1000
      const opts = {
        url,
        timeout: timeoutInMilliseconds
      }

      const waitAndLoad = (loadUrl) => {

        request(opts, (err, res, body) => {
          if (err) {
            waitAndLoad(loadUrl)
            return
          }

          loadUrl()

        })

      }

      waitAndLoad(() => {
        mainWindow.loadURL(url)
      })

    } else {
      mainWindow.loadURL(`file://${rootPath}/app/build/front/index.html`)
    }


}

app.on('ready', windowFactory)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        windowFactory()
    }
})
