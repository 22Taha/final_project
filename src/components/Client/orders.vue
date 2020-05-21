<template>
  <v-container fluid>
    <v-container class="blue lighten-3">
      <v-card outlined >
          <v-card-title>
            Current Order
            <v-spacer></v-spacer>
            Total: {{total}}
            <v-btn color="blue darken-1" class="ml-5" dark @click="validateOrder">Validate</v-btn>
          </v-card-title>
        <v-data-table
          :headers="headers"
          :items="products"
          >

          <template v-slot:top>

              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Product</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="editQuantity" type="number" step="0" min="1" label="Quantity"></v-text-field>
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

          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>

        </v-data-table>
      </v-card>
    </v-container>







    <div class="row mx-auto">
      <v-card v-for="order in orders" outlined color="light-blue darken-2 white--text" class="mt-5 mx-5 col-3">
        <v-card-title>
          Order
          <v-spacer></v-spacer>
          <v-chip v-if="order.state=='new'"
            class="ma-2"
            color="orange darken-1"
            text-color="white"
          >
            Pending
            <v-icon right>mdi-timer-sand</v-icon>
          </v-chip>
          <v-chip v-else
            class="ma-2"
            color="green darken-1"
            text-color="white"
          >
            Validated
            <v-icon right>mdi-check-circle</v-icon>
          </v-chip>
        </v-card-title>
        <v-card-text class="mt-4">  
          <div v-for="(product) in order.products"  class="row white--text my-3">
            <h3> {{product.product_name}} </h3>
            <v-spacer></v-spacer>
            <h4> {{product.price}} X {{product.quantity}} </h4>
          </div>
          <hr class="my-3">
          <div class="row white--text">
            <h3>Total</h3>
            <v-spacer></v-spacer>
            <h4>{{order.total}}</h4>
          </div>
        </v-card-text>   
      </v-card>

   
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'clientOrders',

    data:() => ({
      dialog: false,
      editQuantity: 0,
      editProductId: '',
      headers: [
        { text: 'ID', sortable: false, value: 'product_id' },
        { text: 'Name', value: 'product_name' },
        { text: 'Price', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    }),

    computed: {
      username(){
        return sessionStorage.getItem('username')
      },

      orders(){
        return this.$store.getters.ordersUser(this.username)
      },

      products(){
        return this.$store.getters.productsCurrentOrder(this.username).products
      },

      total(){
        return this.$store.getters.productsCurrentOrder(this.username).total
      }
    },

    methods: {
      validateOrder() {
        this.$store.commit('validateCurrentOrder', this.username)
      },

      editItem(item) {
        this.editQuantity = item.quantity
        this.editProductId = item.product_id
        this.dialog = true
      },

      deleteItem(item) {
        confirm('Are you sure you want to delete this item?') && 
        this.$store.commit('deleteProductFromCurrentOrder', {username: this.username, product: item})
      },

      close() {
        this.dialog = false
        this.editQuantity = ''
        this.editProductId = ''
      },

      save() {
        if(this.editQuantity > 0){
          this.$store.commit('updateProductCurrentOrder', {username : this.username, productId: this.editProductId, productQuantity: this.editQuantity})
          this.close()
        }
      },
    }

  }
</script>
