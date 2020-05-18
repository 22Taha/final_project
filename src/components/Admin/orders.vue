<template>
<div>
  <v-data-table
    :headers="headers"
    :items="orders"
    class="elevation-1"
    :search="search"
    @click:row="showOrder">
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Orders</v-toolbar-title>
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
            <v-col cols="12" sm="6">
              <v-text-field v-model="order.total"  label="Total"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="order.total"  label="Total"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="order.total"  label="Total"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="order.total"  label="Total"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </div>
</template>


<script>
  export default {
    name: 'AdminOrders',
    data: () => ({
      search: '',
      dialog: false,
      order:{   
                id:'',
                user: '',
                validate: '',
                total: '',
                state:'',
                products: []
            },
      headers: [
        { text: 'ID', sortable: false, value: 'id' },
        { text: 'client', value: 'user' },
        {text:'State', value:'state'}
        
      ]
    }),

    computed: {
      orders() {
        return this.$store.getters.orders
      }
    },

    methods: {

      showOrder(item){
        this.order = Object.assign({}, item)
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
