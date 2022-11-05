// components/tabs/index.js
Component({
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },
  data: {
    current:0,   // 控制切换门店的样式
    linePositionX:0,  // 线的定位信息
    linePositionWidth:0, // 线的长度
  },
  // 组件生命周期
  lifetimes:{
    // 在组件实例进入页面节点树时执行
    attached(){
      // 页面刚加载的时候，需要调用一次
      this.calculateLinePositionX()
    }
  },
  methods: {
    onTab(e){
      // console.log(e.currentTarget.dataset);
      const {index} = e.currentTarget.dataset
      this.setData({
        current:index
      })
    //1. 将每次切换后的index，传入进去，因为里面有两个 class=".tab" 的元素，那么我们就需要传入一个index来确定是哪一个
    this.calculateLinePositionX(index)
    },
    // 经过计算，下面的线可以设置到中间区域
    calculateLinePositionX(index = 0){
      this.createSelectorQuery().selectAll('.tab').boundingClientRect(results=>{
        // 2. 获取具体的元素的位置信息
        const rect = results[index]
        //3. 文字的中心点坐标
        const currentCenterX = rect.left +  rect.width/2
        //4. 线的长度
        const linePositionWidth = rect.width * 0.8
        //5. 线的左侧坐标 但是这样需要注意的是，我们需要拿掉第一个元素的 padding-left
        const linePositionX = currentCenterX - linePositionWidth/2 - results[0].left
        this.setData({
          linePositionWidth,
          linePositionX
        })
      }).exec() 
    }
  }
})
