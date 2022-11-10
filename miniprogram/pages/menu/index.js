// pages/menu/index.ts
import swiperApi from '../../api/swiper';
// 2. 导入接口 商品接口
import goodsApi from '../../api/goods';
// 3.导入接口 商品分类接口
import goodsCategoryApi from '../../api/goods-category';
Page({
  data: {
    // 输入框距离顶部的高度计算，可以动态获取 Object wx.getMenuButtonBoundingClientRect()
    headerStyle:'',     // 搜索框距离上面的高度
    store:'',           // 点击进入菜单时候的门店信息
    swiperList:[],       //轮播图页面的图片
    goodsList:[],       // 商品列表图片
  },
  onLoad(options) {
    // 具体门店数据
    let {store} = options
    // 这里对点餐页面进行编译的时候容易出错 SyntaxError: Unexpected token u in JSON at position 0  所以这里添加了判断条件
    if (store && store !== 'undefined') {
    store = JSON.parse(store)
    }
        this.setData({
          store
        })
    // 计算搜索框上面的高度 适配不同的设备
    this.makeHeaderStyle()
    // 调用获取轮播图方法
    this.fetchSwiperList()
    //1. 获取商品数据
    this.fetchData()
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
  },
  // 获取轮播图图片方法
  fetchSwiperList(){
    // 在这里获取图片，我们通过在 api 里面封装了API，获取云开发中的数据
    swiperApi.list().then(res=>{
     this.setData({
       swiperList:res.data
     })
   })
  },
  // 4. 获取商品数据
  fetchData(){
    // 商品接口
    goodsApi.listWithCategory().then(res=>{
      this.setData({
        goodsList:res.result
      })
    })
    // 商品分类接口
    goodsCategoryApi.list().then(res=>{
     
    })
  }
})

  // 取消默认导航条
  // "navigationStyle": "custom"