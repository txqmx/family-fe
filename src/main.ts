import { createApp } from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/styles/main.less'
import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(Vant).use(store).use(router).mount('#app')
app.config.globalProperties.$setLoading = (val) => { app.config.globalProperties.$store.commit('setLoading', val) }
