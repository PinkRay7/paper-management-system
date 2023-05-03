<template>
  <v-navigation-drawer app permanent absolute>
    <v-list>
      <v-list-item
        :prepend-avatar="userInfo.avatarUrl"
        :title="userInfo.userName"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        active-color="#795CA3"
        v-for="item in menuItems"
        :key="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        :to="item.router"
      >
      </v-list-item>
    </v-list>

    <v-btn 
    class="logout-button" 
    flat 
    color="#B886F8" 
    @click="logout">
    LOGOUT
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import { reactive } from 'vue';
export default {
  name: 'CommonNavigation',
  props: {
    // authority: String
    menuItems: {
      type: Array,
      default: () => [],
    },
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    function logout() {
      console.log("LOGOUT")
    }
    return {
      logout
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logout-button {
  position: fixed;
  bottom: 20px; /* 调整按钮与底部的距离 */
  left: 50%;
  width: 240px;
  transform: translateX(-50%);
  color: white;
  font-size: medium;
  font-weight: bold;
  border-radius: 5px;
}
</style>
