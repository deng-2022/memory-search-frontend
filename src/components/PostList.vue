<template>
  <div>
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
            <template #description>
              <div v-html="item.author" style="margin-bottom: 10px"></div>
            </template>
          </a-list-item-meta>
        </a-list-item>
        <span v-html="item.content" style="width: 100%"></span>

      </template>
    </a-list>
  </div>

  <div>
    <a-pagination
        show-size-changer
        v-model:current="current"
        v-model:pageSize="pageSize"
        :total="500"
        @showSizeChange="onShowSizeChange"
    />
  </div>
</template>

<script setup lang="ts">
import {withDefaults, defineProps, watch} from "vue";
import {ref} from 'vue';


const pageSize = ref(20);
const current = ref(3);
const onShowSizeChange = (current: number, pageSize: number) => {
  console.log(current, pageSize);
};

watch(pageSize, () => {
  console.log('pageSize', pageSize.value);
});

watch(current, () => {
  console.log('current', current.value);
});

interface Props {
  postList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
});
</script>

