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
      <a-tab-pane key="post" tab="诗词">
        <PostList :post-list="postList"/>
      </a-tab-pane>

      <a-tab-pane key="article" tab="博文">
        <ArticleList :article-list="articleList"/>
      </a-tab-pane>

      <a-tab-pane key="picture" tab="图片">
        <PictureList :picture-list="pictureList"/>
      </a-tab-pane>

      <!--      <a-tab-pane key="video" tab="视频">-->
      <!--        <UserList :user-list="videoList"/>-->
      <!--      </a-tab-pane>-->
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import {ref, watchEffect} from "vue";
import myAxios from "@/plugins/myAxios";
import PostList from "@/components/PostList.vue";
import ArticleList from "@/components/ArticleList.vue";
import {useRoute, useRouter} from "vue-router";
import PictureList from "@/components/PictureList.vue";
import {message} from "ant-design-vue";


// 文章列表
const postList = ref([]);
const articleList = ref([]);
// const videoList = ref([]);
const pictureList = ref([]);

const router = useRouter();
const route = useRoute();
const activeKey = route.params.category;

const searchText = ref(route.query.text || "");

const initSearchParams = {
  type: activeKey,
  text: "",
  pageSize: 30,
  pageNum: 1,
};

const searchParams = ref(initSearchParams);

/**
 * 加载数据
 * @param params
 */

const loadDataOld = (params: any) => {
  const postQuery = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("post/list/page/vo", postQuery).then((res: any) => {
    postList.value = res.records;
  });

  const pictureQuery = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("picture/list/page/vo", pictureQuery).then((res: any) => {
    pictureList.value = res.records;
  });
};

const loadData = (params: any) => {
  const {type = "post"} = params;
  if (!type) {
    message.error("类别为空");
    return;
  }
  const query = {
    ...params,
    searchText: params.text,
  };

  myAxios.post("/search/all", query).then((res: any) => {
    if (type === "post") {
      postList.value = res.dataList;
    } else if (type === "picture") {
      if (res.dataList !== null) {
        pictureList.value = res.dataList.map((picture: any) => {
          return {
            ...picture,
            isVisitable: false
          };
        });
      }
    } else if (type === "article") {
      articleList.value = res.dataList;
    }
  })
}

// 执行搜索
const onSearch = (value: any) => {
  router.push({
    query: {
      ...searchParams.value,
      text: value,
    },
  });

  loadData(searchParams.value);
  const type = route.params.category;

  if (type === "post") {
    message.success("成功检索出您感兴趣的诗词~")
  } else if (type === "user") {
    message.success("成功检索出您感兴趣的用户~")
  } else if (type === "picture") {
    pictureList.value = [];
    getImages()
  } else if (type === "article") {
    message.success("成功检索出您感兴趣的博文~")
  }
};

// 花费时间的执行反馈
const getImages = () => {
  const hide = message.loading('图片正在加载中，需要一点时间~', 0);
  setTimeout(hide, 4000);
};

// 切换Tab页
const onTabChange = (key: any) => {
  router.push({
    path: key,
    query: searchParams.value,
  });
};

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
    type: route.params.category,
  } as any;
  loadData(searchParams.value);
});
</script>
