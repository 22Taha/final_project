<template>
  <v-container>
    <v-card width="500" class="mx-auto mt-5">
      <v-card-title>
          <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field 
            label="username" 
            v-model.trim="username"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field 
            label="password" 
            v-model="password"
            prepend-icon="mdi-lock" 
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
            :type="showPassword? 'text' : 'password'" 
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'login',

    data: () => ({
      showPassword : false,
      username: '',
      password: ''
    }),
    computed:{
      ...mapGetters([
      'getUser'
    ])
    },
    methods:{
      login(){
        if(this.username=='admin' && this.password=='admin'){
          this.$router.push({ path: 'admin/home' })
        }else{
          if(this.getUser(this.username, this.password))
              this.$router.push({ path: 'client/home' })
          else
              alert('user doesn\'t exist !!')
        }
      }
    }
  }
</script>
