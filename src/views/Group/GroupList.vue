<template>
  <v-container>
    <v-row no-gutters align="center" justify="space-between">
      <v-col cols="7">
        <v-text-field
          v-model="search"
          variant="underlined"
          label="搜索课题组"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn icon="mdi-magnify" variant="plain"></v-btn>
      </v-col>
      <v-col cols="4" class="custom-btn-col">
        <v-btn prepend-icon="mdi-plus" variant="outlined">新增课题组</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <div>
    sdasd
  </div>
</template>

<script>
import { getFormData } from '@/utils/api';
import { onMounted, reactive, ref } from 'vue';

export default {
  name: 'GroupList',
  components: {},
  setup() {
    let search = ref("")
    onMounted(() => {
      console.log('!!!!!!!!!!!!!!!!');
    });
    return {
      search
    }
  },
};
</script>

<style scoped>
.custom-btn-col {
  margin-bottom: 10px;
}
</style>
