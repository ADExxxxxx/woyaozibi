import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
// 全局注册组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 进行挂载
Vue.prototype.$message = Message
