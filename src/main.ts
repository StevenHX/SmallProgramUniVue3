import { createSSRApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import zhouWeiNavBar from "@/components/zhouWei-navBar/index.vue"
export function createApp() {
  const app = createSSRApp(App)
  uni.getSystemInfo({
    success: function (e: any) {
      // #ifndef MP
      app.config.globalProperties.$StatusBar = e.statusBarHeight
      if (e.platform == 'android') {
        app.config.globalProperties.$CustomBar = e.statusBarHeight + 50
      } else {
        app.config.globalProperties.$CustomBar = e.statusBarHeight + 45
      }
      // #endif

      // #ifdef MP-WEIXIN
      app.config.globalProperties.$StatusBar = e.statusBarHeight
      const custom = wx.getMenuButtonBoundingClientRect()
      app.config.globalProperties.$Custom = custom
      app.config.globalProperties.$CustomBar = custom.bottom + custom.top - e.statusBarHeight
      // #endif

      //窗口高度
      app.config.globalProperties.$windowHeight = e.windowHeight
      //获取导航高度
      app.config.globalProperties.$navHeight = e.statusBarHeight * (750 / e.windowWidth) + 91
      app.config.globalProperties.$SystemInfo = e
    },
  })
  app.use(store, key)
  app.component("nav-bar", zhouWeiNavBar)
  return {
    app,
  }
}
