// components/siderbar/index.js
Component({
  // 6. 接收传入的数据
  properties: {
    list:{
      type:Array,
      value:[]
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
    }
  }
})
