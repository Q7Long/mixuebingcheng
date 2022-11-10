import {db, cloud} from './cloud-init'

const list = () => {
  return db.collection('goods').get()
}
// 聚合数据 lookup 类似于 join的方式检索
// https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/aggregate/Aggregate.lookup.html#%E7%A4%BA%E4%BE%8B
const listWithCategory = () => {
  return cloud.callFunction({
    // name是一个云函数 data不需要，如果没有传入回调函数的话就是生成的promise
    name: 'goods-list-with-category'
  })
}

export default {
  list,
  listWithCategory
}