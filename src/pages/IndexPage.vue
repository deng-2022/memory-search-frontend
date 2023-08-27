<template>
  <div class="hello">
    <!--搜索框-->
    <a-input-search
        v-model:value="searchParams.text"
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
        图片
      </a-tab-pane>

      <a-tab-pane key="用户" tab="用户">
        用户
      </a-tab-pane>
    </a-tabs>


  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watchEffect} from 'vue';
import myAxios from "@/plugins/myAxios";
import PostList from "@/components/PostList.vue"
import {useRoute, useRouter} from "vue-router";

// 文章列表
const postList = ref([]);
const router = useRouter();
const route = useRoute();
const activeKey = route.params.category;


const searchParams = ref({
  text: ''
})


onMounted(() => {
  myAxios.post("/post/list/page/vo", {})
      .then((res: any) => {
            postList.value = res.records
          }
      )
      .catch()
})

// 执行搜索
const onSearch = (value: any) => {
  router.push({
    query: searchParams.value
  })
}

const onTabChange = (key: any) => {
  router.push({
    path: key,
    query: searchParams.value
  })
}

watchEffect(()=>{
  searchParams.value = {
    text: route.query.text as string
  }
})
</script>

