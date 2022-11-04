// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始化登录成功后的跳转
    goto:''
  },
  login(e){
    // // 注意这里如果是个人认证是没有办法拿到手机号的
    // // console.log(e);
    // const cloudId = e.detail.CloudID
    // wx.cloud.callFunction({
    //   name:'get-phone-number',
    //   data:{
    //     weRunData: wx.clouod.CloudID(cloudId), // 这个 CloudID 值到云函数端会被替换
    //   }
    // }).then(res=>{
    //   // console.log(res);
    //   // 根据手机号码判断是否登录
    //   wx.setStorage("phoneNumber",res.result)
    //   // 跳转回来
    //   wx.switchTab({
    //     url: this.data.goto,
    //   })
    // })


    // 由于上面是个人用户，无法获取手机号，所以这里选择不去获取手机号，直接跳转页面
    wx.switchTab({
      url: this.data.goto,
    })
    wx.showToast({
      title: '登录成功',
      icon:"success",
      mask:true
    })
    wx.setStorageSync('phoneNumber', 132981691233)
  },
  onLoad(options) {
    const goto = '/pages/index/index'
    this.setData({
      goto
    })
  },

})