<template>
 <div id="app">

       <component :is="layout"></component>
 </div>
</template>

<script>

import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'


export default {
  data:()=>({
    component:"Articles"


  }),
  methods:{

  },
  computed: {
    layout: function ()  {

      return (this.$route.meta.layout || 'empty')+'-layout';
    }
  },
  components:{
    EmptyLayout,MainLayout
  }
}
</script>

<style>
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";

</style>
