<template>
  <v-container>
   <v-app-bar
      color="deep-purple accent-3"
      dense
      flat
      dark
    >
      <v-toolbar-title> ADMIN </v-toolbar-title>
      <v-spacer></v-spacer>
        <router-link class="white--text ml-3" :to="{ name: 'adminProducts'}" > Products </router-link>
        <router-link class="white--text ml-3" :to="{ name: 'adminOrders'}"> Orders </router-link>
        <router-link class="white--text ml-3" :to="{ name: 'adminUsers'}"> Users </router-link>
    </v-app-bar> 

      <router-view class="mt-5"></router-view>
    
    </v-container>
</template>

<script>

  export default {
    name: 'adminHome',

    data: () => ({
      
    }),
    
    created(){
      let currentUser= this.$store.getters.currentUser;
      if(currentUser!='admin')this.$router.push({ name: 'login'}) ;

    },  
  }
</script>
