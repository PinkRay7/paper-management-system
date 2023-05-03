<template>
  <v-app>
    <v-container>
      <common-navigation
        :userInfo="userInfo"
        :menuItems="menuItems"
      ></common-navigation>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import { getFormData } from '@/utils/api';
import CommonNavigation from '@/components/CommonNavigation.vue';
import { onMounted, reactive, ref } from 'vue';

export default {
  name: 'Main',
  components: {
    CommonNavigation,
  },
  setup() {
    let menuItems = ref([
      {
        icon: 'mdi-home',
        title: '首页',
        value: 'home',
        router: { path: '/home' },
      },
      {
        icon: 'mdi-account-multiple',
        title: '我的课题组',
        value: 'group',
        router: { path: '/group' },
      },
      {
        icon: 'mdi-bell',
        title: '我的消息',
        value: 'notification',
        router: { path: '/notification' },
      },
    ]);

    let userInfo = reactive({
      avatarUrl: '',
      userName: '',
    });

    function getNavigationInfo() {
      getFormData('/user/getUserInfo', {}).then((resp) => {
        Object.assign(userInfo, resp.data.result);
        console.log(userInfo);
      });
    }

    onMounted(() => {
      getNavigationInfo();
    });

    return {
      userInfo,
      menuItems,
      getNavigationInfo,
    };
  },
};
</script>

<style></style>
