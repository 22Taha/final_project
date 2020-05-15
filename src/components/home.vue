<template>
  <v-container>
   <v-app-bar
      :color="user=='admin'? 'deep-purple accent-3' : 'green' "
      dense
      flat
      dark
    >
      <v-toolbar-title> {{user}} </v-toolbar-title>
      <v-spacer></v-spacer>
        <router-link class="white--text ml-3" :to="{ name: 'products', params: { user: user }}" > Products </router-link>
        <router-link class="white--text ml-3" :to="{ name: 'orders', params: { user: user }}"> Orders </router-link>
        <router-link v-if="user=='admin'" class="white--text ml-3" :to="{ name: 'users', params: { user: user }}"> Users </router-link>
    </v-app-bar> 

      <router-view class="mt-5"></router-view>
    

    </v-container>
</template>

<script>
import product from './products'
import order from './orders'
import user from './users'
  export default {
    name: 'home',
    components:{
      product,
      order,
      user
    },

    data: () => ({
      user: ''
    }),
    
    created(){
      this.user = this.$route.params.user
      if(!(this.$route.params.user=='client' || this.$route.params.user=='admin')){
        this.$router.push('/')
      }
      
    }
  }
</script>
