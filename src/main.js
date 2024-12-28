import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { registerGlobalComponents } from './utils/register-components'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

// Register global components
registerGlobalComponents(app)

app.use(pinia)
app.use(router)

app.mount('#app')