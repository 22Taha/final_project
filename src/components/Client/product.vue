<template>
  <v-container fluid>
    <h3>SHOW PRODUCT {{product}} </h3>
  </v-container>
</template>

<script>
  export default {
    name: 'clientProduct',

    data:() => ({
     
    }),

    computed: {
      product() {
        return this.$store.getters.product(this.$route.params.id)
      }
      
    },
    created(){
      let currentUser = sessionStorage.getItem('current_user');
      if(currentUser==(null || undefined))this.$router.push({ name: 'login'}) ;
    },

    methods: {
     
    }

  }
</script>
