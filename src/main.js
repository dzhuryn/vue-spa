import Vue from 'vue'
import store from './store'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from "./router";
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import tooltipDirective from "@/directives/tooltip.directive";

import messagePlugin from "./utils/message.plugin";
import Loader from "./components/app/Loader";

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

import 'materialize-css/dist/js/materialize.min'

Vue.use(Vuelidate);
Vue.use(messagePlugin);

Vue.filter('date',dateFilter);
Vue.filter('currency',currencyFilter);

Vue.directive('tooltip',tooltipDirective);

Vue.component('Loader',Loader);

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAN1nFhnARuUvf3rnmNEcJh-qqkGg7XKc0",
  authDomain: "vuejs-cb761.firebaseapp.com",
  projectId: "vuejs-cb761",
  storageBucket: "vuejs-cb761.appspot.com",
  messagingSenderId: "118856693170",
  appId: "1:118856693170:web:21f0bfb87d657837bb20ab"
};

firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});




