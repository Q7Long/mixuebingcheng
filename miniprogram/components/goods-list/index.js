// components/goods-list/index.js
Component({
  options:{
    multipleSlots:true   // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    goodsList:{
      type:Array,
      value:[]
    },
    // 03. 这样只需要指定的值就可以跳到对应的地方，在父组件中的 onSideBarChange()的时候就可以拿到对应的值传入到这里  下一步menu/index.js
    current:{
      type:Number,
      value:0,
    }
  },
  data: {
    index:0,        // 定义一个状态判断是否要加 fixed 属性
  },
  methods: {
    // 07. 实现onScroll方法，获取没个种类的 section的高度，基于rects来判断是否已经达到了top，来吧sectionId里面的 style 改掉
    onScroll(e) {
      const rootTop = e.target.offsetTop
      this.createSelectorQuery().selectAll('.section').boundingClientRect(
        rects => {
          const result = rects.find(item=>{
            //08. 判断一下 top的值是否还在 rootTop 的范围里面，如果还在说明当前的分类还没有滚动完，保持一个fixed的状态
            return item.top <= rootTop && item.bottom >= rootTop
          })
          //09. 如果在第一个范围里面这里面的result对应的就是id="section-0"部分如果超出这个就开始第二个，id="section-1" result.dataset.index 是在wxml中传入的
          // console.log(result);
          !result || this.changeIndex(result.dataset.index)
        }
      ).exec()
    },
    //10. 设置状态判断是否要加 fixed 的效果
    changeIndex(index) {
      this.setData({
        index
      })
      //11. 传入onchange事件，并且将index传出，把A子组件的值传给父组件,在通过父组件传给子组件接收
      this.triggerEvent('on-change', {index})
    },
    selectGoods(e) {
      const { goods} = e.currentTarget.dataset
      this.triggerEvent('on-selected', goods)
    }
  }
})
