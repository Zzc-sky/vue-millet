import Vue from 'vue'
import {
    Button,
    message,
    Modal,
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Modal)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm


