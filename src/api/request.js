import axios from 'axios'
import { message } from 'ant-design-vue'

const instanse = axios.create({
    baseURL: "/api",
    timeout: 5000
})

// 响应拦截
instanse.interceptors.response.use((response) => {
    let res = response.data;
    if (res.status == 0) {
        return res.data
    } else if (res.status == 10) {
        window.location.href = '/#/login';
        return Promise.reject(res);
    } else {
        message.error(res.msg)
        return Promise.reject(res)
    }
})

export default instanse