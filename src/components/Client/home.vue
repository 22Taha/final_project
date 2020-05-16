<template>
  <v-container>
   <v-app-bar
      color="green"
      dense
      flat
      dark
    >
      <v-toolbar-title> CLIENT </v-toolbar-title>
      <v-spacer></v-spacer>
        <router-link class="white--text ml-3" :to="{ name: 'clientProducts'}" > Products </router-link>
        <router-link class="white--text ml-3" :to="{ name: 'clientOrders'}"> Orders </router-link>
    </v-app-bar> 

      <router-view class="mt-5"></router-view>
    
    </v-container>
</template>

<script>

  export default {
    name: 'clientHome',

    data: () => ({
      user: ''
    }),
    
    created(){
      
    }
  }
</script>
