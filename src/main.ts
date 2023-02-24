import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'

import  'vant/lib/index.css'
import './style/main.scss'

import {} from 'vant'
import pinia from './stores'

const app = createApp(App)

app.use(pinia)

app.use(router)

app.mount('#app')
