<template>
  <div class="hello">
    <!--搜索框-->
    <a-input-search
        v-model:value="searchText"
        placeholder="请输入搜索关键词"
        enter-button="搜索"
        size="large"
        @search="onSearch"
    />

    <!--标签页-->
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="文章" tab="文章">
        <PostList :post-list="postList"/>
      </a-tab-pane>

      <a-tab-pane key="图片" tab="图片">
        <PictureList :picture-list="pictureList"/>
      </a-tab-pane>

      <a-tab-pane key="用户" tab="用户">
        <UserList :user-list="userList"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import {ref, watchEffect} from 'vue';
import myAxios from "@/plugins/myAxios";
import PostList from "@/components/PostList.vue"
import {useRoute, useRouter} from "vue-router";
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";

// 文章列表
const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);

const router = useRouter();
const route = useRoute();
const activeKey = route.params.category;

const searchText = ref(route.query.text || "");

const initSearchParams = {
  type: activeKey,
  text: "",
  pageSize: 15,
  pageNum: 1,
};

const searchParams = ref(initSearchParams)


/**
 * 加载数据
 * @param params
 */

const loadDataOld = (params: any) => {
  const postQuery = {
    ...params,
    searchText: params.text
  }
  myAxios.post("post/list/page/vo", postQuery).then((res: any) => {
    postList.value = res.records;
  });

  const userQuery = {
    ...params,
    userName: params.text
  }
  myAxios.post("user/list/page/vo", userQuery).then((res: any) => {
    userList.value = res.records;
  });

  const pictureQuery = {
    ...params,
    searchText: params.text
  }
  myAxios.post("picture/list/page/vo", pictureQuery).then((res: any) => {
    pictureList.value = res.records;
  });
}

const loadData = (params: any) => {
  const query = {
    ...params,
    searchText: params.text
  }
// 聚合搜索
  myAxios.post("search/list/page/vo", query).then((res: any) => {
    postList.value = res.postList;
    userList.value = res.userList;
    pictureList.value = res.pictureList;
  });
}


// 执行搜索
const onSearch = (value: any) => {
  router.push({
    query: {
      ...searchParams.value,
      text: value,
    },
  })
  loadData(searchParams.value)
}

const onTabChange = (key: any) => {
  router.push({
    path: key,
    query: searchParams.value
  })
}

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
    type: route.params.category,
  } as any;
  loadData(searchParams.value);
})
</script>

