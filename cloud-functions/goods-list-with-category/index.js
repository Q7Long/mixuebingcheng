// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  // 云函数根据goods_category 聚合了一下goods
  const result = await db.collection('goods_category').aggregate()
    .lookup({
      from: 'goods',
      localField: '_id',
      foreignField: 'category',
      as: 'goodsList',
    }).end()

    return result.list
  }