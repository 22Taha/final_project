<template>
<v-container fluid class="blue lighten-3">
  <v-data-table
    :headers="headers"
    :items="products"
    
    :items-per-page="7"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Products</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      </v-toolbar>
    </template>
    
     <template v-slot:item.actions="{ item }">
      <v-icon class="mr-4" @click="addToOrder(item)" >
        mdi-cart-arrow-down
      </v-icon>
      <v-icon class="mr-4" @click="showProduct(item)">
        mdi-eye-outline
      </v-icon>
    </template>

  </v-data-table>


  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Order</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="9">
              <v-text-field v-model="quantity" type="number" min="1" step="0" label="Quantity"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</v-container>
</template>


<script>
  export default {
    name: 'clientProducts',
    data: () => ({
      search: '',
      username: '',
      quantity: null,
      dialog: false,
      addProduct: null,
      headers: [
        { text: 'ID', sortable: false, value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Description', value: 'description' },
        { text: 'Category', value: 'category' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    }),

    computed: {
      products() {
        return this.$store.getters.products
      }
    },

    created(){
      this.username = this.$store.getters.currentUser;
      if(this.username==(null || undefined))this.$router.push({ name: 'login'}) ;
    },

    methods: {
      showProduct(item){
        this.$router.push({ name: 'clientProduct', params: {id: item.id}})
      },

      addToOrder(item){
        this.addProduct = Object.assign({}, item)
        this.addProduct['username']=this.username
        this.dialog = true
      },
      
      save() {
        if(this.quantity > this.addProduct.quantity){
          alert("Quantity available: "+ this.addProduct.quantity)
        }else{
          this.addProduct['quantity']=this.quantity
          this.$store.commit('addProductToCurrentOrder', this.addProduct)
          this.close()
        }
      },

      close(){
        this.addProduct = null
        this.quantity= null
        this.dialog = false
      },
    },
  }
</script>
