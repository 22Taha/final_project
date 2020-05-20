<template>
    <v-data-table
    :headers="headers"
    :items="Users"
    
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Users</v-toolbar-title>

       <v-spacer></v-spacer>
        
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialogUser" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">User</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedUser.username" label="Username"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedUser.password" type="password"  label="Password"></v-text-field>
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
    name: 'adminUsers',

    data: () => ({
      dialogUser: false,
      
      search: '',
      headers: [
        { text: 'ID', sortable: false, value: 'id' },
        { text: 'Userame', value: 'username' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    
      editedUser: {
        id: '' ,
        name: '',
        password:''
      },
      defaultItem: {
        id: '' ,
        name: '',
       password:''
            },
    }),

    computed: {
      Users() {
        return this.$store.getters.users
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created(){
      let currentUser= sessionStorage.getItem('current_user');
      if(currentUser!='admin')this.$router.push({ name: 'login'}) ;

    }, 

    methods: {
      editItem (item) {
        this.editedUser = Object.assign({}, item)
        this.editedUser.password='';
        this.dialogUser = true
      },

      deleteItem (item) {
        confirm('Are you sure you want to delete this User?') && this.$store.commit('deleteUser', item)
      },

      close () {
        this.dialogUser = false
        this.$nextTick(() => {
          this.editedUser = Object.assign({}, this.defaultItem)
        })
      },

      save () {
          this.$store.commit('updateUser', this.editedUser);
          this.close()
      },
    },
  }
</script>
