<template>
    <v-data-table
    :headers="headers"
    :items="products"
    
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

        <v-spacer></v-spacer>

        <v-dialog v-model="dialogProduct" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Product</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Product</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedProduct.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedProduct.price" type="number" min="1" step="0.01" label="Price"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedProduct.description" label="Description"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                      <v-select :items="categories" v-model="editedProduct.category" label="Category"></v-select>
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

        <v-dialog v-model="dialogCategory" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2 ml-3" v-on="on">New Category</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Category</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="9">
                    <v-text-field v-model="newCategory" label="Category"></v-text-field>
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
      </v-toolbar>
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
</template>

<script>

  export default {
    name: 'adminProducts',

    data: () => ({
      dialogProduct: false,
      dialogCategory: false,
      newCategory: '',
      search: '',
      headers: [
        { text: 'ID', sortable: false, value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Description', value: 'description' },
        { text: 'Category', value: 'category' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    
      editedProduct: {
        id: '' ,
        name: '',
        price: '',
        description: '',
        category: '' 
      },
      defaultItem: {
        id: '' ,
        name: '',
        price: '',
        description: '',
        category: ''      },
    }),

    computed: {
      products() {
        return this.$store.getters.products
      },

      categories() {
        return this.$store.getters.categories
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    methods: {
      editItem (item) {
        this.editedProduct = Object.assign({}, item)
        this.dialogProduct = true
      },

      deleteItem (item) {
        confirm('Are you sure you want to delete this item?') && this.$store.commit('deleteProduct', item)
      },

      close () {
        this.dialogProduct = false
        this.dialogCategory= false
        this.newCategory = ''
        this.$nextTick(() => {
          this.editedProduct = Object.assign({}, this.defaultItem)
        })
      },

      save () {
        if(this.newCategory==''){
          this.$store.commit('updateProduct', this.editedProduct)
        }else{
          this.$store.commit('addCategory', this.newCategory)
        }
        this.close()
      },
    },
  }
</script>
