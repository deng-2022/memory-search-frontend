<template>
  <a-list item-layout="horizontal" :data-source="props.postList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
        >
          <!--标题-->
          <template #title>
            <a href="https://www.antdv.com/" v-html="item.title"></a>
          </template>
          <!--头像-->
          <template #avatar>
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
          </template>
          <template #description>
            <div v-html="item.content" style="margin-bottom: 10px"></div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import {withDefaults, defineProps} from "vue";

interface Props {
  postList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
});
</script>

