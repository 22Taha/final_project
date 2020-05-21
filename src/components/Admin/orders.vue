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
        
        <v-chip
          class="ma-2"
          color="orange"
          text-color="white"
        >
          Total income: {{totalIncom}}
          
        </v-chip>
        
        <v-spacer></v-spacer>
        
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-switch v-model="newOrders" class="mt-6" label="Show new orders"></v-switch>
       
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
            <v-col cols="12" sm="3">
               <label class="font-weight-bold" >Order state :</label>
            </v-col>
           
            <v-col cols="12" sm="9" class="font-weight-bold ">
                
                <v-chip  v-if="order.state=='new'" color="green" text-color="white"  >
                {{order.state}}
                </v-chip>
                <v-chip v-else  >
                {{order.state}}
                </v-chip>

            </v-col> 
            <v-col cols="12" sm="3" >
               <label class="font-weight-bold" >Total :</label>
            </v-col>
            <v-col cols="12" sm="9" class="font-weight-bold">
              <v-chip > {{order.total}}  </v-chip>
            </v-col>
            <v-col cols="12" sm="3" class="font-weight-bold">
               <label class="font-weight-bold" >Client :</label>
            </v-col>
            <v-col cols="12" sm="9" class="font-weight-bold">
             <v-chip> {{order.user}}</v-chip>
            </v-col>
            <v-col cols="12" sm="12">
              <v-simple-table>
              <template v-slot:default>
              <thead>
              <tr>
                  <th class="text-left">Product</th>
                 <th class="text-left">Price</th>
                 <th class="text-left">Quantity</th>
              </tr>
             </thead>
           <tbody>
               <tr v-for="product in order.products" :key="product.product_id">
               <td>{{ product.product_name }}</td>
                <td>{{ product.price }}</td>
               <td>{{ product.quantity }}</td>
              </tr>
            </tbody>
          </template>
          </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions v-if="order.state=='new'" >
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="confirm">Confirm</v-btn>
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
      newOrders: false,
      order:{   
                id:'',
                user: '',
                validate: '',
                total: '',
                state:'',
                products: []
            },
            defaultItem:{   
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
        { text:'State', value:'state' }
        
      ]
    }),
    created(){
      let currentUser= sessionStorage.getItem('current_user');
      if(currentUser!='admin')this.$router.push({ name: 'login'}) ;

    }, 

    computed: {
      orders() {
        if(this.newOrders)
          return this.$store.getters.newOrders
        else
          return this.$store.getters.orders
      },
      totalIncom(){
        return this.$store.getters.totalIncom
      },

    },

    methods: {

      showOrder(item){
        this.order = Object.assign({}, item)
        this.dialog = true
      },
      
      confirm() {
        this.order.state='confirmed'
        this.$store.commit('confirmOrder', this.order)
        this.close()
      },

      close(){
        
        this.dialog = false 
        this.$nextTick(() => {
          this.order = Object.assign({}, this.defaultItem)
        })
      }
    },
  }
</script>
