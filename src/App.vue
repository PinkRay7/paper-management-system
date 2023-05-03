<template>
  <v-app>
    <!-- <Login></Login> -->
    <router-view></router-view>
    <!-- <Main></Main> -->
  </v-app>
</template>

<script>
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'

export default {
  name: 'App',
  components: {
    // Login,
    Main
  },
  setup() {
    return {}
  }
}
</script>

