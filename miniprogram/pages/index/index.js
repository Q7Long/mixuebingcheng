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
    current:0,    // 轮播图小图标切换
    memberInfo:null
  },

  //1. 当轮播图切换的时候，调用这个方法，给 current 重新赋值，改变切换按钮的样式
  onSwiperChange(e){
    // 可以先进行解构，将里面的 current 拿出来
    const { current } = e.detail
    // console.log(current);
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
  // 登录按钮操作
  gotoLogin(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },

  // 点击点餐卡片跳转至菜单页
  onMenuCardClick(){
   if(wx.getStorageSync('phoneNumber')){
    wx.switchTab({
      url: '/pages/menu/index',
    })
   }else{
    wx.showToast({
      title: '请先登录',
      image:'../../assets/images/home-selected.png',
      mask:true,   //是否显示透明蒙层，防止触摸穿透，默认：false
    })
   }
  },
  // 点击最下面的去文章页面
  onArticleClick(){
    wx.navigateTo({
      url: '/pages/web-view/index?url=http://www.zhangqilong.cn',
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
  onShow(){
    // 去拿手机号数据
    this.loadNumberInfo()
  },
  loadNumberInfo(){
   if(wx.getStorageSync('phoneNumber')){
    this.setData({
      memberInfo:wx.getStorageSync('phoneNumber')
    })
   }
  }
})