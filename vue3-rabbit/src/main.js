import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
const app = createApp(App)

//引入初始化的样式文件
import '@/styles/common.scss'


//测试接口函数
// import {getCategory} from './apis/testApi.js'
// getCategory().then(res=>{
//     console.log(res)
// },err=>{
//     console.log(err)
// })

app.use(createPinia())
app.use(router)

app.mount('#app')
