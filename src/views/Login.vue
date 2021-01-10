<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="$v.email.$model"
            :class="{invalid:$v.email.$dirty && (!$v.email.required ||!$v.email.email) }"
        >

        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Обезательное поле</small>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.email">Введите email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"

            v-model="$v.password.$model"
            :class="{invalid:$v.password.$dirty && (!$v.password.required ||!$v.password.minLength) }"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Обязательное поле</small>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.minLength">
          Пароль должен быть {{ $v.password.$params.minLength.min}}, сейчас он {{ password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email,required,minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages';



export default {
  mounted() {
    if(messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message])

    }
  },
  data:() =>({
    email:'',
    password:'',
  }),
  validations:{
    email:{email,required},
    password:{required,minLength:minLength(6)},

  },
  methods:{
    async submitHandler(){
      console.log(this)

      if(this.$v.$invalid){
        this.$v.$touch();

        return ;
      }
     const formData = {
        email:this.email,
        password: this.password,
     };

      try {
        await this.$store.dispatch('login',formData);
        this.$router.push('/')
      }
      catch (e){

      }



    }
  }
}
</script>