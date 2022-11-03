import swiper from "../../api/swiper"

// pages/index/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[
      // {
      //   imageUri:'../../assets/images/lb1.png',
      //   type:'url',
      //   target:"http://baidu.com"
      // },
      // {
      //   imageUri:'../../assets/images/lb2.png',
      //   // 跳转到产品具体的详情页
      //   type:'product',
      //   target:"1"
      // },
      // {
      //   imageUri:'../../assets/images/lb3.png',
      //   type:'url',
      //   target:"http://baidu.com"
      // }
    ],
    current:0
  },

  //1. 当轮播图切换的时候，调用这个方法，给 current 重新赋值，改变切换按钮的样式
  onSwiperChange(e){
    // 可以先进行解构，将里面的 current 拿出来
    const { current } = e.detail
    this.setData({
      current
    })
  },
  // 2. 当手指点图片的时候跳转页面
  onSwiperTab(e){
    // 获取传过来的数据，item
    const {item} = e.currentTarget.dataset
    // console.log(item);
    // 如果里面类型是type，说明是跳转的url，走第一个选项，如果不是走第二个
    item.type === 'url' ? wx.navigateTo({
      url: `/pages/web-view/index?url=${item.target}`,
    }) : wx.navigateTo({
      url: `/pages/product/detail?id=${item.target}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  // 在这里获取图片，我们通过在 api 里面封装了API，获取云开发中的数据
   swiper.list().then(res=>{
    // console.log(res);
     this.setData({
       swiperList:res.data
     })
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})