import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import firebase from 'firebase';
// import VueYouTubeEmbed from 'vue-youtube-embed'

// import Panel from './components/global/Panel.vue'


Vue.config.productionTip = false
// Vue.use(VueYouTubeEmbed)

// make component globally imported
// Vue.component('panel', Panel)

const firebaseConfig = {

  apiKey: "AIzaSyD-OqJGxeF8om1VaRXwudrCayna_WMnFBw",

  authDomain: "my-vue-chat-78f05.firebaseapp.com",

  projectId: "my-vue-chat-78f05",

  storageBucket: "my-vue-chat-78f05.appspot.com",

  messagingSenderId: "1084806881083",

  appId: "1:1084806881083:web:ec1c7a2e5b8dd95cbde11e"

}

// sync(store, router)

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app'))

