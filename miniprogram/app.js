// app.ts
App({
  globalData: {},
  onLaunch() {
    // 初始 cloud 功能，初始一下环境，才能调用方法 const db = wx.cloud.database() 去调用数据库
    wx.cloud.init();

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})