import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 10
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    number: +Mock.Random.date('T'),
    name: '赵日天',
  }))
}

export default {
  getList: config => {
    const {page = 1, limit = 20 } = param2Obj(config.url)

    let mockList = List.filter(item => {
      return true
    })


    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
