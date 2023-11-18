<template>
  <div class="article">
    <a-button @click="doSearchTest">效果展示</a-button>
    <!--博文列表展示-->
    <div v-if="doSearchArticle">
      <a-list
          item-layout="horizontal"
          :data-source="props.articleList">

        <template #renderItem="{ item }">
          <a-list-item>
            <div class="article">
              <!--博文-->
              <a-card hoverable>
                <!--操作-->


                <div @click="goToRead(item.id)">
                  <!--标题-->
                  <a-card-meta>
                    <template #title>
                      <div v-html="item.title"></div>
                    </template>
                    <!--文章信息-->

                    <template #description>
                      <div style="margin-top: 10px">
                        <span> <ClockCircleTwoTone/> 创建于 {{ item.createTime }}</span>
                        <span style="margin-left: 12px"> <ClockCircleTwoTone/> 更新于 {{ item.updateTime }}</span>
                        <span style="margin-left: 12px"> <EyeTwoTone/> 浏览量 {{ item.view }}</span>
                      </div>
                    </template>
                  </a-card-meta>

                  <!--其他信息-->
                  <div style="position: relative">
                    <!--文章简介-->
                    <div style="position: absolute;width: 60%;margin-top: 20px">
                      <div v-html="item.description"></div>
                    </div>
                    <!--作者信息-->
                    <!--                  <a-avatar style="position: absolute; top: 150px;left: 25px" size="large"-->
                    <!--                            :src="item.author.avatarUrl"/>-->
                    <!--                  <div style="position: absolute;top: 160px;left: 80px;">-->
                    <!--                    <a-tag color="green"> {{ item.author.username }}</a-tag>-->
                    <!--                  </div>-->
                    <div style="position: absolute;top: 180px;left: 650px">
                      <a-tag color="orange" class="size">orange</a-tag>
                      <a-tag color="green" class="size">green</a-tag>
                      <a-tag color="cyan" class="size">cyan</a-tag>
                      <a-tag color="blue" class="size">blue</a-tag>
                    </div>
                    <!--文章配图-->
                    <div style="margin-left: 65%">
                      <img style="width: 350px" :src="item.articleUrl">
                    </div>
                  </div>
                </div>
              </a-card>
            </div>
          </a-list-item>
        </template>
      </a-list>
    </div>

    <!--执行博文搜索-->
    <div v-else-if="!doSearchArticle">
      <a-list
          class="demo-loadmore-list"
          item-layout="horizontal"
          :data-source="props.articleList"
      >
        <template #renderItem="{ item }">
          <a-list-item>

            <!--文章操作-->
            <template #actions>
              <a @click="goToRead(item.id)">查看</a>
              <a>删除</a>
            </template>

            <a-list-item-meta>
              <template #title>
                <!--                <a @click="goToRead(item.id)">{{ item.title }}</a>-->
                <div v-html="item.title"></div>
              </template>

              <template #description>
                <div v-html="item.description"></div>
              </template>
            </a-list-item-meta>

            <!--文章标签-->
            <!--            <div v-for="(tag,index) in item.tags" :key="index" style="position: absolute;left: 700px;">-->
            <!--              <a-tag color="orange">{{ tag }}</a-tag>-->
            <!--            </div>-->

            <div style="position: absolute;left: 700px;">
              <a-tag color="orange">orange</a-tag>
              <a-tag color="green">green</a-tag>
              <a-tag color="cyan">cyan</a-tag>
              <a-tag color="blue">blue</a-tag>

            </div>


            <div style="position:absolute; margin-left: 70%">
              <!--文章配图-->
              <img style="width: 120px" :src="item.articleUrl">
            </div>
          </a-list-item>
        </template>
      </a-list>
    </div>

    <div v-else>
      <a-empty></a-empty>
    </div>
  </div>

</template>

<script setup lang="ts">
import {withDefaults, defineProps, ref} from "vue";
import {
  ClockCircleTwoTone,
  EyeTwoTone,
} from '@ant-design/icons-vue';
import router from "@/router";

// 执行聚合搜素
const doSearchArticle = ref(false);

const doSearchTest = () => {
  doSearchArticle.value = !doSearchArticle.value
}

// 跳转博文详情页
const goToRead = (id: never) => {
  // router.push(`/blog/read/${id}`)
  router.push({
    name: "blogRead",
    path: "/blog/read",
    query: {
      articleId: id
    }
  })
}

interface Props {
  articleList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  articleList: () => [],
});
</script>

<style>
.article {
  width: 100%;
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

