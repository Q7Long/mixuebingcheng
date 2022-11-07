const db = wx.cloud.database()
const _ = db.command
const list = (longitude,latitude) => {
  // 只拿10个数据，这里必须要get()才会调用
  // return db.collection('store').limit(10).get()
  // 改造获取最近距离的门店
  return db.collection('store').where({
    location:_.geoNear({
      geometry: db.Geo.Point(longitude,latitude),
      // 最小距离可选
      // minDistance: 1000,
      // 最大距离，30公里内数据都可以拿到，这里就可以修改数据去获取多远范围内的数据
      maxDistance: 30000,
    })
  }).limit(10).get()
}

export default {
  list
}