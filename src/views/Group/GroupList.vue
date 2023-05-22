<template>
  <v-container>
    <v-row no-gutters align="center" justify="space-between">
      <v-col cols="7">
        <v-text-field
          v-model="searchText"
          variant="underlined"
          label="搜索课题组"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn icon="mdi-magnify" variant="plain" @click="searchGroup"></v-btn>
      </v-col>
      <v-col cols="4" class="custom-btn-col">
        <v-btn prepend-icon="mdi-plus" variant="outlined" @click="addNewGroup">新增课题组</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-card
      class="card-class"
      v-for="item in groupInfos"
      :title="item.groupName"
      :subtitle="item.groupIntro"
      :key="item.groupId"
      @click="getOneGroup(item.groupId)"
    >
      <template v-slot:title>
        <div class="card-title">
          {{ item.groupName }}
          <v-chip class="chip" v-if="item.authority === 3" color="orange" size="x-small">管理员</v-chip>
          <v-chip class="chip" v-if="item.authority < 3" color="green" size="x-small">成员</v-chip>
        </div>
      </template>
      <div class="card-content">
        <span class="span-class">成员 {{ item.memberNum }}人</span>
        <span class="span-class">文献 {{ item.paperNum }}篇</span>
        <span class="span-class">笔记 {{ item.noteNum }}篇</span>
      </div>
    </v-card>
  </v-container>
  <v-container class="max-width">
    <v-pagination
      v-model="currentPage"
      class="my-4"
      :length="totalPages"
      @update:model-value="searchGroup"
    ></v-pagination>
  </v-container>
</template>

<script>
import { getFormData, postFormData } from '@/utils/api';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'GroupList',
  components: {},
  setup() {
    const router = useRouter()

    let currentPage = ref(-1);
    let totalPages = ref(10);
    let searchText = ref('');

    let groupInfos = ref([]);

    function searchGroupFunc(thisSearchText, thisCurrentPage) {
      console.log(thisSearchText + "&" + thisCurrentPage)
      postFormData('/group/searchGroup', {
        searchText: thisSearchText,
        currentPage: thisCurrentPage,
      }).then((resp) => {
        groupInfos.value = resp.data.result.groupInfos;
        currentPage.value = resp.data.result.currentPage;
        totalPages.value = resp.data.result.totalPages;
      });
      // console.log(groupInfos);
    }

    function searchGroup() {
      searchGroupFunc(searchText.value, currentPage.value)
    }

    function addNewGroup() {

    }

    function getOneGroup(groupId) {
      console.log("getOneGroup",groupId)
      router.push(`/group/${groupId}`)
    }

    onMounted(() => {
      searchGroupFunc('', -1);
    })

    return {
      currentPage,
      totalPages,
      searchText,
      groupInfos,

      searchGroup,
      addNewGroup,
      getOneGroup,
    };
  },
};
</script>

<style scoped>
.custom-btn-col {
  margin-bottom: 10px;
}
.span-class {
  margin-left: 6px;
  margin-right: 15px;
  font-weight: 500
}
.card-class {
  margin-bottom: 10px;
  width: 80%;
}
.card-title {
  font-weight: bold;
}
.card-content {
  padding-left: 10px;
  padding-bottom: 10px;
}
.chip {
  margin-left: 5px;
  margin-bottom: 3px;
}
</style>
