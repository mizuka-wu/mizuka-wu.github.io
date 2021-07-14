---
title: electron-updater踩坑
tags:
  - electron
  - apple
  - electron-builder
  - arm64
date: 2021-07-09 12:11:57
categories: 工作日志
---
# electron-updater踩坑

因为项目里都用上了`electron`，基本上因为需要做到自动升级，所以都引入了`electron-updater`作为升级手段，其中还是遇到了一部分坑的

## 必须签名

这个就不展开讲了，总之得花钱买签名文件，如果应用程序没有签名的话，是没办法自动升级的，主要还是升级的话，因为需要权限去替换文件和重启应用

## electron-updater

### 如何生成latest.yml
记得在`package.json`/`vue.configs.js`对应的位置增加`publish`


```json
        publish: [
          {
            provider: 'generic',
            url: url
          }
        ],
```

### 如何实现定时监测并提示
写了一个类来实现定时调用

```javascript
/**
 * 周期循环调用
 */
export default class TimerRunner {
  /**
     * 定时调用该系统
     * @param {Function} handler 运行的程序
     * @param {object} options 运行配置
     * @param {boolean} options.immediate 是否立即执行
     * @param {number} options.time 执行间隔
     */
  constructor (handler, options = {}) {
    const { immediate, time } = options
    /**
     * 调用的函数
     */
    this.handler = handler
    /**
     * 运行间隔
     */
    this.time = time || 1000
    /**
     * 定时器标志
     */
    this.timer = null
    /**
     * 最后一次成功运行时间
     */
    this.lastRunningTime = new Date().getTime()
    if (immediate) {
      this.run()
    }
  }

  /**
   * 运行，函数，会重制定时器
   */
  run (...arg) {
    const vm = this
    this.handler(...arg)
    this.stop()
    this.timer = setTimeout(function () {
      vm.run()
    }, this.time)
  }

  stop () {
    clearTimeout(this.timer)
  }

  get nextRunTime () {
    const { time, lastRunningTime } = this
    return new Date(lastRunningTime + time)
  }
}

```

### 弹窗确认更新
目前还需要增加进度条，之后封装成组件

采取了手动接管`autoUpdater`的事件来实现自定义更新提示, `downloadPromise`存在的话，表示有更新

```
import { autoUpdater } from 'electron-updater'
import { dialog } from 'electron'

autoUpdater.checkForUpdates()
      .then(({ updateInfo, downloadPromise }) => {
        // 有更新
        if (downloadPromise) {
          logger.info(`检测到更新${updateInfo.version}`)
          return downloadPromise
            .then(() => {
              // 1s 后提示开始更新
              setTimeout(() => {
                const response = dialog.showMessageBoxSync({
                  type: 'info',
                  icon: ICON_PATH,
                  buttons: ['重启', '稍后'],
                  title: '已准备好进行更新',
                  message: '已下载完更新',
                  detail: updateInfo.releaseNotes
                })
                logger.info('用户选择', response === 0 ? '重启' : '之后更新')
                if (response === 0) {
                  setImmediate(() => {
                    app.removeAllListeners('window-all-closed')
                    autoUpdater.quitAndInstall(false, true)
                    setTimeout(() => {
                      app.exit()
                    }, 100)
                  })
                }
              }, 1000)
            })
        }
      })
```

### 显示更新文案

上面的弹窗部分可以看到用了`updateInfo.releaseNotes`，这个值在`package.json`/`vue.config.json`中给`electron-builder`设置，当然也可以用`-c`来设置

```
        releaseInfo: {
          releaseNotes
        },
```

打包的```latest.yml```中就会有对应的字端了
