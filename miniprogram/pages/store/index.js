// pages/store/index.js
// 11. 引入计算属性，对markers进行处理
const computedBehavior = require('miniprogram-computed').behavior
//1. 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
import storeApi from '../../api/store';
Page({
  //12. 引入
  behaviors: [computedBehavior],
  data: { 
    longitude:113.554637,
    latitude:34.818552,
    // 地图上的蜜雪冰城标记点，自定义 markers
    // 14. 这里将原来的 markers 删除
    // markers:[ 
    //   {id:1,title:'实际位置',latitude:34.748349,longitude:113.613347,iconPath:'../../assets/images/marker.png', 
    //   width:'55rpx',height:'69rpx'}
    // ],
    storeList:[],    // 门店列表数据  
    // 但是我们里面的 status 是OPENING，我们需要对应成 营业中
    dict:{
      'OPENING':'营业中',
      'CLOSED':'已关店'
    },
  },
   // 13. 对markers数据进行处理
   computed: {
    // 根据形参里面的值的变化，去动态的修改 markers 的变化
    markers(data) {
      // console.log(data.storeList);
    // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
   return data.storeList.map((item,index)=>{
      return {
        // 这个 id 需要 Number 类型
        id: index + 1,
        key:item._id,
        title:item.name,
        latitude:item.location.latitude,
        longitude:item.location.longitude,
        iconPath:'../../assets/images/marker.png',
        width:'55rpx', height:'69rpx'
      }
    })
  },
},

  //1. 在当前页面增加了一个成员变量 mapContext，封装到全局变量中全局就可以调用
  mapContext:null,
  // 2. 定义全局 mapSdk
  mapSdk:null,

 async onLoad(options) {
    // 调用封装的获取位置信息方法
    this.loadCurrentLocation()  
    // 作用从当前位置获取context，并且赋值到成员变量mapContext中
    this.initMapContext()
    // 获取storeList的方法，在拿到位置数据信息之后再执行，或者将这个方法放进loadCurrentLocation方法里面
    await this.fetchStoreList()
    //3. sdk的方法
    this.initMapSdk();
  },

  //3. 点击回到中心点位置
  gotoCurrentLocation(){
    // 4. 任何一个位置只要点击就回到当前位置
    this.mapContext.moveToLocation()
  },
  
  // 封装获取位置信息方法
  loadCurrentLocation(){
    // 获取当前位置信息
    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位
      success: (res)=> {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude,
          longitude
        })
      }
    })
  },

  // 封装加载 mapContext的方法
  initMapContext(){
    // 点击右下角小图标返回当前位置  
    wx.createSelectorQuery().select('#store-map').context(res=>{
      //2. 刚加载页面的时候我们进行一个对 mapContext 的获取
      this.mapContext = res.context;
    }).exec()
  },

  // 获取门店列表数据方法
  fetchStoreList(){
    //7. 改造之后，这里需要传入参数，这里获取的门店数据是store.js里面修改后的多远范围内的数据
    storeApi.list(this.data.longitude,this.data.latitude).then(res =>{
      // 只是这样获取data是空的，创建的模型在数据库中默认是谁创建谁来看，因为在上下文中会拿到openId，然后当前模拟用户里面是没有openId的，所以这里没有权限拿到这些东西。进入云开发-数据库-store-数据权限-所有用户可读，仅创建者可读写
      // console.log(res);
      //5. 在数据放入storeList列表之前，先对数据进行排序处理
      this.makeStoreList(res.data)
    })
  },

  //6. 对数据进行处理的方法
  makeStoreList(storeList){
    // 根据列表里面的经度和维度，再匹配当前位置的经度维度，把距离计算出来，增加一个新的属性，塞到storeList里面
    const locationList = storeList.map(item=>{
      return {
        //8. 这里根据数据库中的字段获取经纬度，如果只有一个location字段可以选用第一种方式获取
        latitude:item.location.latitude,
        longitude:item.location.longitude,
        // latitude:item.latitude,
        // longitude:item.longitude,
       }
    })
    // 调用微信小程序JavaScript SDK 里面距离计算的方法 调用距离计算接口
    this.mapSdk.calculateDistance({
        //from参数不填默认当前地址
        //获取表单提交的经纬度并设置from和to参数（示例为string格式）
        // from: 若起点有数据则采用起点坐标，若为空默认当前地址，可以不写
        to: locationList, //终点坐标
        success:(res)=>{//成功后的回调
          //9. 获取到数据，对storeList进行处理
          // console.log(res);
          storeList.forEach((item,key)=>{
            //10. 给storeList添加一个新的键（distance）和值，并且将米转成千米
            storeList[key]['distance'] =( res.result.elements[key].distance/1000).toFixed(2)
          })
          this.setData({
            storeList
          })
        },
        fail: function(error) {
          console.error(error);
        }
    })
    // 10.上面塞进去之后这里就不需要return数据了
    // return data
  },

  //4. SDK方法
  initMapSdk(){
  // 实例化SDK 
    this.mapSdk = new QQMapWX({
      // 文档-组件-map-小程序地图插件使用指南-开发文档-微信小程序JavaScript SDK - 申请密匙-开启不验证域名-没有报错-文档-距离计算
      key:'5CSBZ-GOXKJ-2STFF-FFMDX-25IGO-KSBQ6'
    })
  },

  // 14. 实现点击导航的事件，进入地图界面
  navigateLocation(e){
    //15. 接收传过来的参数
    const {latitude,longitude} =e.currentTarget.dataset.location
    console.log(e);
    wx.openLocation({
      latitude,
      longitude
    })
  },

  // 15. 实现点击电话调用API
  call(e){
    // console.log(e);
    const {phone} = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber:phone
    })
  }
})