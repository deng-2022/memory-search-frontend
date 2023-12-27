<template>
  <div class="post">
    <a-list item-layout="horizontal" :data-source="props.postList">
      <template #renderItem="{ item }">
        <a-list-item>

          <a-card hoverable style="width: 240px">
            <a-list-item-meta>
              <!--标题-->
              <template #title>
                <div v-html="item.title"></div>
              </template>
              <!--头像-->
              <template #description>
                <div v-html="item.author" style="margin-bottom: 10px"></div>
              </template>
            </a-list-item-meta>
            <span v-html="item.content" style="width: 100%"></span>
          </a-card>
        </a-list-item>

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

<style>
.post {
  background-color: #E1E0C7;
}
</style>

