<template>
<div>
  <v-data-table
    :headers="headers"
    :items="products"
    class="elevation-1"
    :search="search"
    @click:row="addOrder">
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
              <v-text-field v-model="quantity" label="Quantity"></v-text-field>
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

  </div>
</template>


<script>
  export default {
    name: 'clientProducts',
    data: () => ({
      search: '',
      username: '',
      quantity: '',
      dialog: false,
      addProduct: '',
      headers: [
        { text: 'ID', sortable: false, value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Description', value: 'description' },
        { text: 'Category', value: 'category' },
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    }),

    computed: {
      products() {
        return this.$store.getters.products
      }
    },

    created(){
      this.username = sessionStorage.getItem('username')
    },

    methods: {

      addOrder(item){
        this.addProduct = Object.assign({}, item)
        this.addProduct['username']=this.username
        this.dialog = true
      },
      
      save() {
        this.addProduct['quantity']=this.quantity
        this.$store.commit('addOrder', this.addProduct)
        this.close()
      },

      close(){
        this.addProduct = null
        this.quantity= ''
        this.dialog = false
      },
    },
  }
</script>
