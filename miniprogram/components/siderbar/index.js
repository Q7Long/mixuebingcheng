// components/siderbar/index.js
Component({
  properties: {
    list:{
      type:Array,
      value:[
        1,2,3,4,5
      ]
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
