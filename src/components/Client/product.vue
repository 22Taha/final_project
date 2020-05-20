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

    methods: {
     
    }

  }
</script>
