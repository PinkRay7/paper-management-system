<template>
  <v-tabs
  v-model="activeTab"
  color="#B886F8"
  >
    <v-tab value="comment">评论</v-tab>
    <v-tab value="system">系统</v-tab>
  </v-tabs>
  <v-window v-model="activeTab">
    <v-window-item value="comment"
    >
    <div>21223</div>
    </v-window-item>
    <v-window-item value="system"
    >
    <div>34453</div>
    </v-window-item>
  </v-window>
</template>

<script>
import { getFormData } from '@/utils/api';
import { onMounted, reactive, ref } from 'vue';

export default {
  name: 'Notification',
  components: {},
  setup() {
    let activeTab = ref("")
    onMounted(() => {
      activeTab.value = "comment"
      // console.log('!!!!!!!!!!!!!!!!');
    })
    return {
      activeTab
    }
  },
};
</script>

<style scoped>
.outside {
  background-color: blue;
}
</style>
