// pages/me/index.ts
// 1. 引入
const computedBehavior = require('miniprogram-computed').behavior
Page({
  //2. 引入
  behaviors: [computedBehavior],
  data: {
    phoneNumber:'',   // 手机号码
    imgUri:'../../assets/images/me-avatar.png',  // 图片地址
  },
  //3. 引入
  computed: {
    // 脱敏
    desensitiveMobile(data) {
      // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
      // 这个函数的返回值会被设置到 this.data.sum 字段中
      let phoneNumber = data.phoneNumber.toString()
      if(phoneNumber){
      // {\d3} 是前三位的数字 {\d2}是后两位， {\d6}对中间内容进行处理
      phoneNumber = phoneNumber.replace(/^(\d{3})\d{6}(\d{2})$/,"$1******$2");
      }
      return phoneNumber
    },
  },
  // 登录操作
  login(){
    wx.navigateTo({
      url: '/pages/login/index?from=me',
    })
  },
  onShow() {
    const phoneNumber = wx.getStorageSync('phoneNumber')
    this.setData({
      phoneNumber
    })
    if(phoneNumber){
      this.setData({
        imgUri:'../../assets/images/vip-pic.png'
      })
    }
  }
})