<template>
  <div>
    <div>
      <a-list
          class="demo-loadmore-list"
          item-layout="horizontal"
          :data-source="props.compreList"
          style="width: 400%"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              🔥
              1554
              <h2>热度</h2>
              <a @click="goToRead(item.id)">查看</a>
            </template>

            <a-list-item-meta>
              <template #title>
                <div v-html="item.title" ></div>
              </template>

              <template #description>
                作者 浏览 互动 收藏
              </template>
            </a-list-item-meta>

          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from "vue/dist/vue";
import router from "@/router";

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
  compreList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  compreList: () => [],
});

</script>

<style>

</style>

