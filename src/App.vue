<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import login from './components/login';

export default {
  name: 'App',

  components: {
    login,
  },

  data: () => ({
    
  }),
};
</script>
