<template>
  <v-container fluid>
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

      <div class="text-center ma-2">
        <v-snackbar
          v-model="snackbar"
          top
          color="orange darken-1"
          multi-line
          :timeout="timeout"
        >
          <h3>{{notification}}</h3>
          <v-btn
            color="black"
            text
            @click="resetNotification"
          >
            Close
          </v-btn>
        </v-snackbar>
      </div>
    
    </v-container>
</template>

<script>

  export default {
    name: 'adminHome',

    data: () => ({
      snackbar:false,
      timeout:0,
    }),

    methods:{
      resetNotification(){
        if(this.$store.getters.notification != ''){
          return this.$store.commit('resetNotification')
          this.snackbar=false
        }
      }
    },

    computed:{
      notification(){
          return this.$store.getters.notification
          this.snackbar = true
      }
    },
    
    created(){
      let currentUser= sessionStorage.getItem('current_user');
      if(currentUser!='admin')this.$router.push({ name: 'login'}) ;

    },  
  }
</script>
