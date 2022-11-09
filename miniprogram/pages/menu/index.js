// pages/menu/index.ts
Page({
  data: {
    // 输入框距离顶部的高度计算，可以动态获取 Object wx.getMenuButtonBoundingClientRect()
    headerStyle:'',     // 搜索框距离上面的高度
    store:'',           // 点击进入菜单时候的门店信息
  },
  onLoad(options) {
    // 具体门店数据
    let {store} = options
    store = JSON.parse(store)
        this.setData({
          store
        })
    // 计算搜索框上面的高度 适配不同的设备
    this.makeHeaderStyle()
  },
  makeHeaderStyle(){
    // https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html
    // 距离上面的高度是有两个部分组成的 第一部分是距离上面的高度 + 电池区域的高度
    const {top, bottom,height} = wx.getMenuButtonBoundingClientRect()
    const menuButtonCenterPoint = (top + height/2)
    //  search-input 的一半是32rpx 这样设置可以在所有记性都对齐到中间
    const headerStyle = 'margin-top:calc( '+ menuButtonCenterPoint +'px-32rpx);'
    this.setData({
      headerStyle
    })
  },
  // 回到门店列表界面
  switchCurrentStore(){
    wx.navigateBack({
      delta:0
    })
  }
})
