import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import info from './info'
import category from './category'
import record from "@/store/record";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        error: null,
    },
    mutations: {
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null
        }
    },
    actions:{
     async fetchCurrency(){
          const key = process.env.VUE_APP_FIXER;
          const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=RUB,USD,EUR`);
          let data =  await res.json();

          return data;
      }
    },
    getters: {
        error: s => s.error
    },
    modules: {
        auth, info,category,record
    }
})