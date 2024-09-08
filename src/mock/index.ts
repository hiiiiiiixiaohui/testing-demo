// 使用 Mock
import Mock from "mockjs"

Mock.mock("/api/tablelist","get",{
    'data|20000': [
    {
      'id|+1': 1,
      'name': '@name',
      'age|18-60': 1,
      'email': '@email',
    },
  ],
})
