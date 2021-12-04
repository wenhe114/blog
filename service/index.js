import axios from 'axios'
// import { Message } from 'element-ui'
// import qs from 'qs'
import config from './config'
// if (process.server) {
//     config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
// } else {
    config.baseURL = "/blogApi"
// }

const service = axios.create(config)

// POST 传参序列化
service.interceptors.request.use(
    config => {
        // if (config.method === 'post') config.data = qs.stringify(config.data)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 返回状态判断
service.interceptors.response.use(
    res => {
        if (!res) {
            throw new Error('Invalid Request.')
        }
        if (res.status === 200) {
            const result = res.data
            return result
        }else{
            return Promise.reject(res.data)
        }

    },
    error => {
        return Promise.reject(error)
    }
)

export default service