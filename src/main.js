import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components'
import datas from '@/assets/datas'
import '@/styles/index.scss'
import { router } from '@/router'

const Vue = createApp(App)

Vue.provide('datas', datas)

Object.keys(components).forEach((key) => {
	Vue.component(key, components[key])
})

Vue.use(router)
Vue.mount('#app')
