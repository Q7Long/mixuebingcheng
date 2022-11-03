// components/progress-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收参数 color 是条的颜色
    color:{
      type:String,
      value:''
    },
    // trackColor 是背景的颜色
    trackColor:{
      type:String,
      value:''
    },
    // value就是一个值，这里一般都是百分比
    value:{
      type:Number,
      value:0
    },
    // 如果不加width，那么是占满整个区域，如果指定了width那么就可以限制区域
    width:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  trackStyle:'',
  barStyle:'',
  },
lifetimes:{
  attached(){
    // 两个style的产出，这里是 组件被放在页面的时候 就去执行函数
    this.buildTrackStyle();
    this.buildBarStyle();
  }
},
  /**
   * 组件的方法列表
   */
  methods: {
    // buildTrackStyle对轨道进行计算，就是背景
    buildTrackStyle(){
      // 定义初始值，如果下面两个条件都没达到，那么就给值里面塞进去一个空的 trackStyle
      let trackStyle = '';
      // 判断width是否存在，如果存在加入 width 属性
      // 语法糖：如果前面是真的，就是传入了 width 那么就不会执行后面的部分，如果前面是false，才会执行后面的代码

      // if(this.properties.width){
      //   trackStyle += `width:${this.properties.width
      // } 
      // 与下面类似
      !this.properties.width || (trackStyle += `width:${this.properties.width};`)

      !this.properties.trackStyle || (trackStyle += `background-color:${this.properties.trackStyle};`)
      this.setData({
        trackStyle
      })
    },
    buildBarStyle(){
        // 定义初始值
        let barStyle = '';
        // 判断width是否存在，如果存在加入 width 属性，这里不是随便加的，如果是在0~100之间才加入进去，否则就不加入，并且后面是个数字，所以要加入%
        (this.properties.value <= 0 && this.properties.value >100) || (barStyle += `width:${this.properties.value}%;`)

        !this.properties.color || (barStyle += `background-color:${this.properties.color};`)
        this.setData({
          barStyle
        })
    }
  }
})
