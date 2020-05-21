<template>
  <v-container fluid>
    <v-container>
      <v-row dense class="mt-6"> 
        <v-spacer></v-spacer>
        <v-col cols="6">
          <v-card
            color="blue-grey darken-2"
            dark
          >
            <v-card-title class="headline mb-6">
              <v-spacer></v-spacer>
              <h4>PRODUCT</h4>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="white--text font-weight-medium row	my-3">
              <h2 class="ml-5">Name</h2>
              <v-spacer></v-spacer>
              <h2>{{product.name}} </h2>
            </v-card-text>
            <v-card-text class="white--text font-weight-medium row	my-3">
              <h2 class="ml-5">Price</h2>
              <v-spacer></v-spacer>
              <h2>{{product.price}} </h2>
            </v-card-text>
            <v-card-text class="white--text font-weight-medium row	my-3">
              <h2 class="ml-5">Description</h2>
              <v-spacer></v-spacer>
              <h2>{{product.description}} </h2>
            </v-card-text>
            <v-card-text class="white--text font-weight-medium row	my-3">
              <h2 class="ml-5">Category</h2>
              <v-spacer></v-spacer>
              <h2>{{product.category}} </h2>
            </v-card-text>
            <v-card-text class="white--text font-weight-medium row	my-3">
              <h2 class="ml-5">Quantity</h2>
              <v-spacer></v-spacer>
              <h2>{{product.quantity}} </h2>
            </v-card-text>
            
          </v-card>
        </v-col>

        <v-spacer></v-spacer>
      </v-row>
    </v-container>
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
