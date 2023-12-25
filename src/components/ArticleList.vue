<template>
  <div>
    <!--    <a-button @click="doSearchTest">效果展示</a-button>-->
    <!--博文列表展示-->

    <!--    <div>-->
    <!--      <a-list-->
    <!--          class="demo-loadmore-list"-->
    <!--          item-layout="horizontal"-->
    <!--          :data-source="props.articleList"-->
    <!--      >-->
    <!--        <template #renderItem="{ item }">-->
    <!--          <div>排名</div>-->
    <!--          <a-list-item>-->

    <!--            &lt;!&ndash;文章操作&ndash;&gt;-->
    <!--            <template #actions>-->
    <!--              热度-->
    <!--            </template>-->

    <!--            <a-list-item-meta>-->
    <!--              <template #title>-->
    <!--                <a @click="goToRead(item.id)">{{ item.title }}</a>-->
    <!--                <div v-html="item.title"></div>-->
    <!--              </template>-->

    <!--              <template #description>-->
    <!--                头像-->
    <!--                作者-->
    <!--                浏览-->
    <!--                互动-->
    <!--                收藏-->
    <!--              </template>-->
    <!--            </a-list-item-meta>-->
    <!--          </a-list-item>-->
    <!--        </template>-->
    <!--      </a-list>-->
    <!--    </div>-->

    <div style="width: 500px">
      <a-tabs v-model:activeKey="activeKey" tab-position="left">
        <a-tab-pane key="1" tab="综合">
          <CompreArticleList :compre-list="articleList"/>
        </a-tab-pane>
        <a-tab-pane key="2" tab="后端">
<!--          <BackEndArticleList/>-->
        </a-tab-pane>
        <a-tab-pane key="3" tab="  前端">
<!--          <FrontEndArticleList/>-->
        </a-tab-pane>
        <a-tab-pane key="4" tab="Android">
          Android
        </a-tab-pane>
        <a-tab-pane key="5" tab="iOS">
          iOS
        </a-tab-pane>
        <a-tab-pane key="6" tab="人工智能">
          人工智能
        </a-tab-pane>
        <a-tab-pane key="7" tab="开发工具">
          开发工具
        </a-tab-pane>
        <a-tab-pane key="8" tab="代码人生">
          代码人生
        </a-tab-pane>
        <a-tab-pane key="9" tab="阅读">
          阅读
        </a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script setup lang="ts">
import {withDefaults, defineProps, ref} from "vue";
import CompreArticleList from "@/components/ClassifiedArticle/CompreArticleList.vue";

// 执行聚合搜素
const doSearchArticle = ref(true);

const activeKey = ref('1');


interface Props {
  articleList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  articleList: () => [],
});
</script>

<style>
.article {
  width: 70%;
  margin-bottom: 30px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.like {
  width: 100%;
}

.size {
  font-size: 16px
}
</style>

