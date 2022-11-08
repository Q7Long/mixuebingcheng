// pages/custom-page/index.js
import pageApi from '../../api/page'
Page({
  data: {
    page:null
  },
  onLoad(options) {
    const { code } = options
    pageApi.detail(code).then(res=>{
      // 结果是个数组，所以这里要取到第一个就是页面数据
      const page = res.data[0]
      this.setData({
        page
      })
    // 切换页面内容之后，需要更改 title 的名字
    wx.setNavigationBarTitle({
      title:page.title,
    })
    })
  },
})