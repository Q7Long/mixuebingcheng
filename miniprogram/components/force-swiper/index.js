// components/swiper/index.js
Component({
  properties: {
    // 3. 组件接收数据
    swiperList:{
      type:Array,
      value:[]
    },
    style:{
      type:String,
      value:''
    }
  },
  data: {
    current:0,    // 轮播图小图标切换
  },
  methods: {
  //1. 当轮播图切换的时候，调用这个方法，给 current 重新赋值，改变切换按钮的样式
  onSwiperChange(e){
    // 可以先进行解构，将里面的 current 拿出来
    const { current } = e.detail
    // console.log(current);
    this.setData({
      current
    })
  },
  }
})
