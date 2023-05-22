<template>
  <v-app-bar app>
    <template #prepend>
      <v-btn
        prepend-icon="mdi-chevron-left"
        variant="text"
        @click="backToGroupList"
        >返回
      </v-btn>
    </template>

    <template #append>
      <span class="custom-title">{{ groupInfo.groupName }}</span>
      <span class="custom-content">
        <v-icon>mdi-account</v-icon>
        成员 {{ groupInfo.memberNum }}
      </span>
      <span class="custom-content">
        <v-icon>mdi-text-box-multiple-outline</v-icon>
        文献 {{ groupInfo.memberNum }}
      </span>
      <span class="custom-content">
        <v-icon>mdi-note-multiple</v-icon>
        笔记 {{ groupInfo.noteNum }}
      </span>
      <v-btn
        v-if="groupInfo.authority === 3"
        prepend-icon="mdi-cog"
        variant="outlined"
        @click="editGroup"
        >编辑课题组</v-btn
      >
    </template>
  </v-app-bar>

  <v-container>
    <v-row no-gutters align="center" justify="space-between">
      <v-col cols="3">
        <v-select
          chips
          closable-chips
          multiple
          label="筛选文献"
          :items="tags"
          v-model="selectedTags"
          item-title="name"
          item-value="id"
          variant="underlined"
          @update:modelValue="searchPaper"
        >
        </v-select>
      </v-col>
      <!-- <v-col cols="1"></v-col> -->
      <v-col cols="5">
        <v-text-field
          v-model="searchText"
          variant="underlined"
          label="搜索文献"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn icon="mdi-magnify" variant="plain" @click="searchPaper"></v-btn>
      </v-col>
      <v-col cols="3" class="custom-btn-col">
        <v-btn prepend-icon="mdi-plus" variant="outlined" @click="addNewGroup"
          >新增文献</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <!-- <v-chip-group v-for="item in paperInfos">
      <v-chip v-for="tag in item.tags" :key="tag.id" size="x-small">
        {{ tag.name }}
      </v-chip>
    </v-chip-group> -->
    <v-data-table :headers="headers" :items="paperInfos" :search="searchText" @click:row="handleClick">  
      <template v-slot:item.tags="{ item }">
        <span class="tag-span">
            {{ getTagsText(item) }}
        </span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="editItem(item.raw)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item.raw)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            @update:model-value="searchPaper"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { getFormData, postFormData } from '@/utils/api';
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { VDataTable } from 'vuetify/labs/VDataTable';

export default {
  name: 'GroupInfo',
  components: { VDataTable },
  props: {
    groupId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const groupId = ref('');

    let selectedTags = ref([]);

    let groupInfo = reactive({
      groupId: '',
      authority: 0,
      groupName: '',
      memberNum: 0,
      paperNum: 0,
      noteNum: 0,
    });
    let tags = ref([]);

    let currentPage = ref(-1);
    let totalPages = ref(10);
    let searchText = ref('');

    let headers = ref([
      {
        align: 'center',
        sortable: false,
        key: 'title',
        title: '文献标题',
      },
      { sortable: false, key: 'author', title: '文献作者' },
      {
        sortable: false,
        key: 'source',
        title: '发布会议/期刊',
      },
      { sortable: false, key: 'tags', title: '标签' },
      { sortable: true, key: 'date', title: '发表日期' },
      { sortable: true, key: 'noteNum', title: '笔记' },
      { sortable: false, key: 'actions', title: '操作' },
    ]);

    let paperInfos = ref([]);

    const getTagsText = computed(() => {
      return (rowData) => {
        // console.log(rowData)
        // console.log(rowData.columns.tags)
        if (rowData.columns.tags.length > 0) {
          // console.log(tags.map((tag) => tag.name).join(' · '))
          return rowData.columns.tags.map((tag) => tag.name).join(' · ');
        }
        // return '123';
      };
    });

    function searchPaperFunc(thisTags, thisSearchText, thisCurrentPage) {
      console.log(thisTags, thisSearchText + '&' + thisCurrentPage);
      postFormData('/paper/searchPaper', {
        groupId: groupId.value,
        tagIds: thisTags,
        searchText: thisSearchText,
        currentPage: thisCurrentPage,
      }).then((resp) => {
        console.log(resp.data.result);
        paperInfos.value = resp.data.result.paperInfos;
        console.log(paperInfos.value[0].tags);
        currentPage.value = resp.data.result.currentPage;
        totalPages.value = resp.data.result.totalPages;
      });
      //   console.log(paperInfos.value);
    }

    function searchPaper() {
      searchPaperFunc(selectedTags.value, searchText.value, currentPage.value);
    }

    function handleClick(event) {
      console.log(event.$attrs['data-index'])
      // highlightClickedRow(event);
      // viewDetails(value);
    }

    // function addNewGroup() {}

    function backToGroupList() {
      router.push('/group');
    }

    function getOneGroup(thisGroupId) {
      getFormData('/group/getOneGroup', {
        groupId: thisGroupId,
      }).then((resp) => {
        Object.assign(groupInfo, resp.data.result.groupInfo);
        tags.value = resp.data.result.groupInfo.tags;
      });
      //   console.log(tags);
    }

    onMounted(() => {
      getOneGroup(groupId.value);
      searchPaperFunc(groupId.value, [], '', 0);
    });

    watch(
      () => router.currentRoute.value.params.groupId,
      (newGroupId) => {
        // 监听 groupId 变化，并执行相应的逻辑
        groupId.value = newGroupId;
      }
    );

    return {
      currentPage,
      totalPages,
      searchText,
      groupId,
      groupInfo,
      paperInfos,
      tags,
      selectedTags,

      getTagsText,

      headers,

      handleClick,

      searchPaper,
      backToGroupList,
      //   addNewGroup,
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
  font-weight: 500;
}
.custom-title {
  font-weight: bold;
  font-size: large;
}
.custom-content {
  font-weight: 500;
  padding-left: 10px;
  padding-right: 10px;
}
.chip {
  margin-left: 5px;
  margin-bottom: 3px;
}

.tag-span {
  font-size: x-small;
  font-weight: bold;
}
</style>
