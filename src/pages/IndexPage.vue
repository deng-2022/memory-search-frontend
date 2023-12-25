<template>
  <div class="hello">
    <div style="width: 200%">
      <a-auto-complete
          v-model:value="searchText"
          :options="options"
          style="width: 200px"
          placeholder="请输入搜索关键词"
          @select="onSelect"
          @search="onSearchSuggest"
      />

      <a-button type="primary" @click="onSearch(searchText)">搜索框</a-button>
    </div>

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
import {watchEffect} from "vue";
import myAxios from "@/plugins/myAxios";
import PostList from "@/components/PostList.vue";
import ArticleList from "@/components/ArticleList.vue";
import {useRoute, useRouter} from "vue-router";
import PictureList from "@/components/PictureList.vue";
import {message} from "ant-design-vue";
import {ref} from 'vue';


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
  console.log("params = " + params)
  const {type = "post"} = params;
  if (!type) {
    message.error("类别为空");
    return;
  }

  const query = {
    ...params,
    // searchText: params.text,
    searchText: params.text,
  };

  myAxios.post("/search/all", query).then((res: any) => {
    // 搜索到诗词记录
    if (type === "post") {
      postList.value = res.dataList;
      // 搜索到图片记录
    } else if (type === "picture") {
      if (res.dataList !== null) {
        pictureList.value = res.dataList.map((picture: any) => {
          return {
            ...picture,
            isVisitable: false
          };
        });
      }
      // 搜索到博文记录
    } else if (type === "article") {
      articleList.value = res.dataList;
    }
  })
}

// 搜索建议
interface Suggest {
  value: string;
}

// 请求获得建议词
const getSuggest = (): Suggest => {
  return {
    value: "好好好",
  };
};

// 建议列表
const options = ref<Suggest[]>([]);

// 从建议列表中选择一项
const onSelect = (value: string) => {
  console.log('onSelect', value);
};


// 搜索建议词
const onSearchSuggest = (suggestText: string) => {
  myAxios.get("/search/suggest", {
    params: {
      suggestText: suggestText,
    }
  }).then((res: any) => {
    console.log("res = " + res)
  })

  options.value = !suggestText
      ? []
      : [getSuggest(), getSuggest(), getSuggest()];
};

// 执行搜索
const onSearch = (searchText: string) => {
  console.log(searchText)
  router.push({
    query: {
      ...searchParams.value,
      text: searchText,
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
