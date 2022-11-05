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
    wx.setStorageSync('phoneNumber', 13298169123)
  },
  // 取消登录
  cancel(){
    wx.switchTab({
      // url: '/pages/index/index',
      // 这里直接用的是判断之后的 goto 地址
      url:this.data.goto
    })
  },
  onLoad(options) {
    console.log('login.js',options); // 从这个可以接收到调用login页面时候传入的参数，这样就可以精准控制要返回的页面，比如首页和我的页面都有登录操作，如果不能获取手机号的情况下，我们可以传入参数进行判断，是从哪里来的，比如这里就是传入了 from:me 进行得知
       
    if(options.from == 'me'){
    // 如果是从我的页面来的
      const goto = '/pages/me/index'
      this.setData({
        goto
      })
    }else{
      // 如果是从首页登录来的
      const goto = '/pages/index/index'
      this.setData({
        goto
      })
    }
  },

})