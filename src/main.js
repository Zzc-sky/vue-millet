import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'

// ant-desgin 组件库
import './ant-design'
// 阿里图标
import './assets/iconfont/iconfont.css'
/* css 初始化 */
import "./assets/css/reset.css";

Vue.use(VueLazyLoad, {
    loading: '/imgs/loading-svg/loading-bars.svg'
})

Vue.use(VueCookie)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
