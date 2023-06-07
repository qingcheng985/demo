import './assets/main.css'
import {createPinia} from "pinia/dist/pinia";
import {createApp} from 'vue'
import App from './App.vue'

let pinia = createPinia();


const app = createApp(App)
app.use(pinia)
app.mount('#app')
