// pages/store/index.js
Page({
  data: {
    longitude:113.613347,
    latitude:34.748349,
    // 地图上的蜜雪冰城标记点，自定义 markers
    markers:[
      {id:1,title:'实际位置',latitude:34.748349,longitude:113.613347,iconPath:'../../assets/images/marker.png', 
      width:'55rpx',height:'69rpx'}
    ]
  },
  //1. 在当前页面增加了一个成员变量 mapContext
  mapContext:null,

  onLoad(options) {
    // 获取当前位置信息
    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位
      success: (res)=> {
        console.log(111);
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude,
          longitude
        })
      }
     })
    // 点击右下角小图标返回当前位置  
    wx.createSelectorQuery().select('#store-map').context(res=>{
      //2. 刚加载页面的时候我们进行一个对 mapContext 的获取
      this.mapContext = res.context;
    }).exec()
  },
  //3. 点击回到中心点位置
  gotoCurrentLocation(){
    // 4. 任何一个位置只要点击就回到当前位置
    this.mapContext.moveToLocation()
  }
})