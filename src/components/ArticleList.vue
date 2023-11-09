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
                <template #actions>
                  <LikeTwoTone style="font-size: 18px" key="like"
                               :twoToneColor="item.isLiked ? '#ff4d4f' : '#b0c4d8'"
                               @click="toggleLike(item)"/>

                  <HeartTwoTone style="font-size: 18px" key="collect"
                                :twoToneColor="item.isCollected ? '#ff4d4f' : '#b0c4d8'"
                                @click="toggleCollect(item)"
                  />
                  <MessageTwoTone @click="goToRead(item.id)" style="font-size: 18px" key="comment"
                                  :twoToneColor="item.isComment ? '#ff4d4f' : '#b0c4d8'"
                  />
                </template>
                <div style="position: absolute;left: 195px;top:297px;display: flex">
                  <div style="margin-right: 335px">
                    {{ item.likes }}
                  </div>
                  <div style="margin-right: 335px">
                    {{ item.collects }}
                  </div>
                  <div>
                    {{ item.comments }}
                  </div>
                </div>

                <div @click="goToRead(item.id)">
                  <!--标题-->
                  <a-card-meta :title="item.title">
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
                      {{ item.description }} {{ item.description }} {{ item.description }} {{ item.description }}
                      {{ item.description }} {{ item.description }}
                    </div>
                    <!--作者信息-->
                    <!--                  <a-avatar style="position: absolute; top: 150px;left: 25px" size="large"-->
                    <!--                            :src="item.author.avatarUrl"/>-->
                    <!--                  <div style="position: absolute;top: 160px;left: 80px;">-->
                    <!--                    <a-tag color="green"> {{ item.author.username }}</a-tag>-->
                    <!--                  </div>-->
                    <div style="position: absolute;top: 160px;left: 300px">
                      <a-tag color="orange">orange</a-tag>
                      <a-tag color="green">green</a-tag>
                      <a-tag color="cyan">cyan</a-tag>
                      <a-tag color="blue">blue</a-tag>
                    </div>
                    <!--文章配图-->
                    <div style="margin-left: 65%">
                      <img style="width: 300px" :src="item.articleUrl">
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
            <div style="position: absolute;left: 520px; ">
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
  MessageTwoTone,
  HeartTwoTone,
  LikeTwoTone,
  ClockCircleTwoTone,
  EyeTwoTone,
} from '@ant-design/icons-vue';

// 执行聚合搜素
const doSearchArticle = ref(false);

const doSearchTest = () => {
  doSearchArticle.value = !doSearchArticle.value
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
</style>

