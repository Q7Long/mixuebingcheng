// 这里是获取 swiper 的方式，简单的封装了一层API，获取数据可以通过这种方式获取
import {db} from './cloud-init'
const list = () => {
  return db.collection('mx_swiper').get();
}

export default {
  list
}