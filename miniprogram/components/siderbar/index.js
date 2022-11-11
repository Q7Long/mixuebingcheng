// components/siderbar/index.js
Component({
  // 6. 接收传入的数据
  properties: {
    goodsList:{
      type:Array,
      value:[]
    },
    //014. 接收defaultCurrent值
    defaultCurrent:{
      type:Number,
      value:0,
      }
    },
  // 015. 当defaultCurrent数据变更的时候触发
  observers:{
    'defaultCurrent':function(defaultCurrent){
      // 016.当current与defaultCurrent不相等的时候重新赋值 defaultCurrent 是滚动之后的新的侧边栏index，从而实现双向绑定的效果
      // console.log(defaultCurrent);
      this.data.current == defaultCurrent || this.setData({
        current:defaultCurrent
      })
    }
  },
  data: {
    current:0,     // 定义选中状态的Id
  },
  methods: {
    // 点击侧边栏切换商品方法
    switch(e){
      const { current } = e.currentTarget.dataset
      this.setData({
        current
      })
      this.triggerEvent('on-change', { index: current })
    }
  }
})
